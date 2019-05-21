import { Location } from "./Location";

export interface SpotLocation extends Location {
  address: string | null;
}

export interface Spot {
  id: string;
  name: string;
  description: string | null;
  location: SpotLocation;
}

export class CreateSpotCommand {
  // eslint-disable-next-line
  constructor(
    public name: string,
    public location: Location,
    public description?: string
  ) {}
}
