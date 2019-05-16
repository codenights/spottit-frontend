import { Spot } from "../model/Spot";
import { Location } from "../model/Location";

export interface SpotRepository {
  getSpot(id: string): Promise<Spot>;
  getSpotsByLocation(location: Location, radius: number): Promise<Spot[]>;
}
