import { GetSpot } from "./GetSpot";
import { SpotRepository } from "../repository/SpotRepository";
import { Spot } from "../model/Spot";

const getSpot = (): Spot => ({
  id: "spot-id",
  location: {
    address: "address",
    latitude: 0.1,
    longitude: 0.2
  },
  name: "spot name",
  description: "spot description"
});

describe("GetSpot", () => {
  let repository: SpotRepository;
  let useCase: GetSpot;

  beforeEach(() => {
    repository = {
      getSpot: jest.fn(),
      getSpotsByLocation: jest.fn()
    };
    useCase = new GetSpot({ spotRepository: repository });
  });

  it("execute: should return the spot", async () => {
    // Given
    const spotId = "spot-id";
    (repository.getSpot as jest.Mock).mockResolvedValue(getSpot());

    // When
    const result = await useCase.execute(spotId);

    // Then
    expect(repository.getSpot).toHaveBeenCalledTimes(1);
    expect(repository.getSpot).toHaveBeenCalledWith(spotId);
    expect(result).toEqual(getSpot());
  });
});
