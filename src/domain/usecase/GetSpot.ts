import { SpotRepository } from "../repository/SpotRepository";
import { Spot } from "../model/Spot";

interface Dependencies {
  spotRepository: SpotRepository;
}

export class GetSpot {
  private spotRepository: SpotRepository;

  public constructor({ spotRepository }: Dependencies) {
    this.spotRepository = spotRepository;
  }

  public execute(id: string): Promise<Spot> {
    return this.spotRepository.getSpot(id);
  }
}
