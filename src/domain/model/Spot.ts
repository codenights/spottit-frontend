import { Location } from './Location'

export interface SpotLocation extends Location {
  address: string | null
}

export interface Spot {
  id: string
  name: string
  description: string | null
  location: SpotLocation
}

export interface DetailedSpot extends Spot {
  author: {
    username: string
  }
  comments: Array<{
    id: string
    author: {
      id: string
      username: string
    }
    body: string
    createdAt: Date
  }>
}

export class CreateSpotCommand {
  // eslint-disable-next-line
  constructor(
    public name: string,
    public location: Location,
    public description?: string
  ) {}
}
