import { CreateSpot } from './CreateSpot'
import { SpotRepository } from '../repository/SpotRepository'
import { Spot } from '../model/Spot'
import { Location } from '../model/Location'

const createSpot = (): Spot => ({
  id: 'spot-id',
  location: {
    address: 'address',
    latitude: 0.1,
    longitude: 0.2,
  },
  name: 'spot name',
  description: 'spot description',
})

describe('CreateSpot', () => {
  let repository: SpotRepository
  let useCase: CreateSpot

  beforeEach(() => {
    repository = {
      getSpot: jest.fn(),
      getSpotsByLocation: jest.fn(),
      createSpot: jest.fn(),
    }
    useCase = new CreateSpot({ spotRepository: repository })
  })

  it('execute: should create the spot with name and location', async () => {
    // Given
    const name = 'spot name'
    const location: Location = {
      latitude: 1,
      longitude: 1,
    }
    ;(repository.createSpot as jest.Mock).mockResolvedValue(createSpot())

    // When
    const result: any = await useCase.execute(name, location)

    // Then
    expect(repository.createSpot).toHaveBeenCalledTimes(1)
    expect(repository.createSpot).toHaveBeenCalledWith({ name, location })
    expect(result.data).toEqual(createSpot())
    expect(result.success).toEqual(true)
  })

  it('execute: should create the spot with name, location and description', async () => {
    // Given
    const name = 'spot name'
    const location: Location = {
      latitude: 1,
      longitude: 1,
    }
    const description = 'spot description'
    ;(repository.createSpot as jest.Mock).mockResolvedValue(createSpot())

    // When
    const result: any = await useCase.execute(name, location, description)

    // Then
    expect(repository.createSpot).toHaveBeenCalledTimes(1)
    expect(repository.createSpot).toHaveBeenCalledWith({
      name,
      location,
      description,
    })
    expect(result.data).toEqual(createSpot())
    expect(result.success).toEqual(true)
  })

  it('execute: should return a failure if an error is thrown', async () => {
    // Given
    const name = 'spot name'
    const location: Location = {
      latitude: 1,
      longitude: 1,
    }
    const description = undefined
    ;(repository.createSpot as jest.Mock).mockRejectedValue(
      new Error('Test error')
    )

    // When
    const result: any = await useCase.execute(name, location, description)

    // Then
    expect(repository.createSpot).toHaveBeenCalledTimes(1)
    expect(repository.createSpot).toHaveBeenCalledWith({
      name,
      location,
      description,
    })
    expect(result.data).toBeUndefined()
    expect(result.error).toEqual(new Error('Test error'))
    expect(result.success).toEqual(false)
  })
})
