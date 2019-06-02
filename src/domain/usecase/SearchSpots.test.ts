import { SearchSpots } from './SearchSpots'
import { SpotRepository } from '../repository/SpotRepository'
import { Location } from '../model/Location'
import { Spot } from '../model/Spot'

const getSpot = (overrides: Partial<Spot> = {}): Spot => ({
  description: 'spot description',
  id: 'spot-id',
  location: {
    address: 'address',
    latitude: 0.1,
    longitude: 0.2,
  },
  name: 'spot name',
  ...overrides,
})

describe('SearchSpots', () => {
  let repository: SpotRepository
  let useCase: SearchSpots

  beforeEach(() => {
    repository = {
      getSpot: jest.fn(),
      getSpotsByLocation: jest.fn(),
      createSpot: jest.fn(),
    }
    useCase = new SearchSpots({ spotRepository: repository })
  })

  it('execute: should get the spots in a radius of 7km', async () => {
    // Given
    const location: Location = {
      latitude: 0.1,
      longitude: 0.2,
    }
    ;(repository.getSpotsByLocation as jest.Mock).mockResolvedValue([
      getSpot({ id: 'spot-1' }),
      getSpot({ id: 'spot-2' }),
    ])

    // When
    const result = await useCase.execute(location)

    // Then
    expect(repository.getSpotsByLocation).toHaveBeenCalledTimes(1)
    expect(repository.getSpotsByLocation).toHaveBeenCalledWith(location, 7)
    expect(result).toEqual([
      getSpot({ id: 'spot-1' }),
      getSpot({ id: 'spot-2' }),
    ])
  })
})
