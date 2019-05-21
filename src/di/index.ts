import { createContainer, asClass, asValue } from "awilix";
import { GetSpot } from "../domain/usecase/GetSpot";
import { SearchSpots } from "../domain/usecase/SearchSpots";
import { SpotRepositoryGql } from "../infrastructure/repository/SpotRepositoryGql";
import { GraphQlService } from "../infrastructure/services/Graphql";
import { AuthService } from "../infrastructure/services/AuthService";
import { Cache } from "../infrastructure/services/Cache";
import { DiContainer } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;

if (!apiUrl) {
  throw new Error(
    "Environment variable process.env.REACT_APP_API_URL is required"
  );
}

export const container = createContainer();

const dependencies: DiContainer = {
  // Configuration
  apiUrl: asValue(apiUrl),

  // Services
  graphqlService: asClass(GraphQlService).singleton(),
  authService: asClass(AuthService).singleton(),
  cache: asClass(Cache).singleton(),

  // Repositories
  spotRepository: asClass(SpotRepositoryGql).singleton(),

  // Use case
  getSpot: asClass(GetSpot).singleton(),
  searchSpots: asClass(SearchSpots).singleton()
};

container.register(dependencies as any);

export * from "./Provider";
export * from "./hooks";
