import { SpotRepository } from '../repository/SpotRepository'
import { Spot } from '../model/Spot'
import { Location } from '../model/Location'

interface Dependencies {
  spotRepository: SpotRepository
}

export class SearchSpots {
  private spotRepository: SpotRepository

  public constructor({ spotRepository }: Dependencies) {
    this.spotRepository = spotRepository
  }

  public execute(location: Location): Promise<Spot[]> {
    return this.spotRepository.getSpotsByLocation(location, 7)
  }
}
