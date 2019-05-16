import { createContainer, asClass, asValue } from "awilix";
import { GetSpot } from "../domain/usecase/GetSpot";
import { SearchSpots } from "../domain/usecase/SearchSpots";
import { SpotRepositoryGql } from "../infrastructure/repository/SpotRepositoryGql";
import { GraphQlService } from "../infrastructure/services/Graphql";

export const container = createContainer();

container.register({
  // Configuration
  apiUrl: asValue(process.env.REACT_APP_API_URL),

  // Services
  graphqlService: asClass(GraphQlService).singleton(),

  // Repositories
  spotRepository: asClass(SpotRepositoryGql).singleton(),

  // Use case
  getSpot: asClass(GetSpot).singleton(),
  searchSpots: asClass(SearchSpots).singleton()
});

export * from "./Provider";
export * from "./hooks";
