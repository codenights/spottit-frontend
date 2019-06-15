import { SpotRepository } from '../repository/SpotRepository'
import { Location } from '../model/Location'
import { Spot, CreateSpotCommand } from '../model/Spot'
import {
  UseCaseResult,
  createUseCaseSuccess,
  createUseCaseFailure,
} from '../model/UseCaseResult'

interface Dependencies {
  spotRepository: SpotRepository
}

export class CreateSpot {
  private spotRepository: SpotRepository

  public constructor({ spotRepository }: Dependencies) {
    this.spotRepository = spotRepository
  }

  public execute(
    name: string,
    location: Location,
    tags: string[],
    description?: string
  ): Promise<UseCaseResult<Spot, Error>> {
    const createSpotCommand = new CreateSpotCommand(
      name,
      location,
      tags,
      description
    )

    return this.spotRepository
      .createSpot(createSpotCommand)
      .then(createUseCaseSuccess)
      .catch(createUseCaseFailure)
  }
}
