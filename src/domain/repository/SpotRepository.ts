import { Spot, CreateSpotCommand, DetailedSpot } from '../model/Spot'
import { Location } from '../model/Location'

export interface SpotRepository {
  getSpot(id: string): Promise<DetailedSpot>
  getSpotsByLocation(location: Location, radius: number): Promise<Spot[]>
  createSpot(createSpot: CreateSpotCommand): Promise<Spot>
}
