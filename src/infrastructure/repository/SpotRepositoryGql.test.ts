import { SpotRepository } from '../../domain/repository/SpotRepository'
import { CreateSpotCommand } from '../../domain/model/Spot'
import { Location } from '../../domain/model/Location'
import { GraphQlService } from '../services/Graphql'

import { SearchSpots_spots } from './queries/__generated__/SearchSpots'
import { FetchSpot_spot } from './queries/__generated__/FetchSpot'
import { SpotRepositoryGql, queries } from './SpotRepositoryGql'

const getSpot = (
  overrides: Partial<SearchSpots_spots> = {}
): SearchSpots_spots => ({
  __typename: 'Spot',
  description: 'spot description',
  id: 'spot-id',
  location: {
    __typename: 'Location',
    address: 'spot address',
    latitude: 0.1,
    longitude: 1.0,
  },
  name: 'spot name',
  ...overrides,
})

const getDetailedSpot = (
  overrides: Partial<FetchSpot_spot> = {}
): FetchSpot_spot => ({
  __typename: 'Spot',
  description: 'spot description',
  id: 'spot-id',
  location: {
    __typename: 'Location',
    address: 'spot address',
    latitude: 0.1,
    longitude: 1.0,
  },
  name: 'spot name',
  author: {
    __typename: 'User',
    username: 'janedoe',
  },
  comments: [
    {
      __typename: 'Comment',
      author: {
        __typename: 'User',
        id: 'commenter-1',
        username: 'johndoe',
      },
      body: 'Comment body',
      createdAt: 'Mon, 10 Jun 2019 13:05:42 GMT',
      id: 'comment-1',
    },
  ],
  ...overrides,
})

describe('SpotRepositoryGql', () => {
  let repository: SpotRepository
  let graphqlService: GraphQlService

  beforeEach(() => {
    graphqlService = {
      mutate: jest.fn(),
      query: jest.fn(),
    }
    repository = new SpotRepositoryGql({ graphqlService })
  })

  it('getSpot: should call the API with correct params', async () => {
    // Given
    const spotId = 'spot-id'
    ;((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spot: getDetailedSpot(),
    })

    // When
    await repository.getSpot(spotId)

    // Then
    expect(graphqlService.query).toHaveBeenCalledTimes(1)
    expect(graphqlService.query).toHaveBeenCalledWith(queries.SPOT, {
      id: spotId,
    })
  })

  it('getSpot: should return the spot', async () => {
    // Given
    const spotId = 'spot-id'
    ;((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spot: getDetailedSpot(),
    })

    // When
    const result = await repository.getSpot(spotId)

    // Then
    expect(result).toMatchObject({
      description: 'spot description',
      id: 'spot-id',
      location: {
        address: 'spot address',
        latitude: 0.1,
        longitude: 1.0,
      },
      name: 'spot name',
      author: {
        username: 'janedoe',
      },
      comments: [
        {
          author: {
            id: 'commenter-1',
            username: 'johndoe',
          },
          body: 'Comment body',
          createdAt: new Date(Date.parse('2019-06-10T13:05:42.000Z')),
          id: 'comment-1',
        },
      ],
    })
  })

  it('getSpotsByLocation: should call the API with correct params', async () => {
    // Given
    const location: Location = {
      latitude: 1.0,
      longitude: 0.1,
    }
    const radius = 7
    ;((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spots: [
        getSpot({
          id: 'spot-1',
        }),
        getSpot({
          id: 'spot-2',
        }),
      ],
    })

    // When
    await repository.getSpotsByLocation(location, radius)

    // Then
    expect(graphqlService.query).toHaveBeenCalledTimes(1)
    expect(graphqlService.query).toHaveBeenCalledWith(queries.SEARCH_SPOT, {
      latitude: location.latitude,
      longitude: location.longitude,
      radius,
    })
  })

  it('getSpotsByLocation: should return the spots', async () => {
    // Given
    const location: Location = {
      latitude: 1.0,
      longitude: 0.1,
    }
    const radius = 7
    ;((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spots: [
        getSpot({
          id: 'spot-1',
        }),
        getSpot({
          id: 'spot-2',
        }),
      ],
    })

    // When
    const results = await repository.getSpotsByLocation(location, radius)

    // Then
    expect(results).toEqual([
      getSpot({ id: 'spot-1' }),
      getSpot({ id: 'spot-2' }),
    ])
  })

  it('createSpot: should call the API with correct params', async () => {
    // Given
    const createSpotCommand = new CreateSpotCommand(
      'spot-name',
      { latitude: 0.1, longitude: 1.0 },
      'spot-description'
    )
    ;(graphqlService.mutate as jest.Mock).mockResolvedValue({
      createSpot: null,
    })

    // When
    await repository.createSpot(createSpotCommand)

    // Then
    expect(graphqlService.mutate).toHaveBeenCalledTimes(1)
    expect(graphqlService.mutate).toHaveBeenCalledWith(queries.CREATE_SPOT, {
      description: 'spot-description',
      latitude: 0.1,
      longitude: 1,
      name: 'spot-name',
    })
  })
})
