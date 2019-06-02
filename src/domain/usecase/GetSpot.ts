import { SpotRepository } from '../repository/SpotRepository'
import { DetailedSpot } from '../model/Spot'

interface Dependencies {
  spotRepository: SpotRepository
}

export class GetSpot {
  private spotRepository: SpotRepository

  public constructor({ spotRepository }: Dependencies) {
    this.spotRepository = spotRepository
  }

  public execute(id: string): Promise<DetailedSpot> {
    return this.spotRepository.getSpot(id)
  }
}
