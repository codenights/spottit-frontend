import { SpotRepository } from "../../domain/repository/SpotRepository";
import { GraphQlService } from "../services/Graphql";
import { Spot } from "../../domain/model/Spot";

import { SpotRepositoryGql, queries } from "./SpotRepositoryGql";
import { Location } from "../../domain/model/Location";

const getSpot = (overrides: Partial<Spot> = {}): Spot => ({
  description: "spot description",
  id: "spot-id",
  location: {
    address: "spot address",
    latitude: 0.1,
    longitude: 1.0
  },
  name: "spot name",
  ...overrides
});

describe("SpotRepositoryGql", () => {
  let repository: SpotRepository;
  let graphqlService: GraphQlService;

  beforeEach(() => {
    graphqlService = {
      mutate: jest.fn(),
      query: jest.fn()
    };
    repository = new SpotRepositoryGql({ graphqlService });
  });

  it("getSpot: should call the API with correct params", async () => {
    // Given
    const spotId = "spot-id";
    ((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spot: getSpot()
    });

    // When
    await repository.getSpot(spotId);

    // Then
    expect(graphqlService.query).toHaveBeenCalledTimes(1);
    expect(graphqlService.query).toHaveBeenCalledWith(queries.SPOT, {
      id: spotId
    });
  });

  it("getSpot: should return the spot", async () => {
    // Given
    const spotId = "spot-id";
    ((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spot: getSpot()
    });

    // When
    const result = await repository.getSpot(spotId);

    // Then
    expect(result).toEqual(getSpot());
  });

  it("getSpotsByLocation: should call the API with correct params", async () => {
    // Given
    const location: Location = {
      latitude: 1.0,
      longitude: 0.1
    };
    const radius = 7;
    ((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spots: [
        getSpot({
          id: "spot-1"
        }),
        getSpot({
          id: "spot-2"
        })
      ]
    });

    // When
    await repository.getSpotsByLocation(location, radius);

    // Then
    expect(graphqlService.query).toHaveBeenCalledTimes(1);
    expect(graphqlService.query).toHaveBeenCalledWith(queries.SEARCH_SPOT, {
      latitude: location.latitude,
      longitude: location.longitude,
      radius
    });
  });

  it("getSpotsByLocation: should return the spots", async () => {
    // Given
    const location: Location = {
      latitude: 1.0,
      longitude: 0.1
    };
    const radius = 7;
    ((graphqlService.query as any) as jest.Mock).mockResolvedValue({
      spots: [
        getSpot({
          id: "spot-1"
        }),
        getSpot({
          id: "spot-2"
        })
      ]
    });

    // When
    const results = await repository.getSpotsByLocation(location, radius);

    // Then
    expect(results).toEqual([
      getSpot({ id: "spot-1" }),
      getSpot({ id: "spot-2" })
    ]);
  });
});
