import { createContainer, asClass, asValue } from "awilix";

import { GetSpot } from "../domain/usecase/GetSpot";
import { SearchSpots } from "../domain/usecase/SearchSpots";
import { CreateSpot } from "../domain/usecase/CreateSpot";
import { SpotRepositoryGql } from "../infrastructure/repository/SpotRepositoryGql";
import { CacheLocalStorage } from "../infrastructure/services/CacheLocalStorage";
import { GraphQlApolloService } from "../infrastructure/services/GraphqlApollo";
import { BaseAuthService } from "../infrastructure/services/BaseAuthService";
import { CachedAuthService } from "../infrastructure/services/CachedAuthService";

import { DiContainer } from "./types";
import { FetchHttpService } from "../infrastructure/services/FetchHttpService";

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
  httpService: asClass(FetchHttpService).singleton(),
  graphqlService: asClass(GraphQlApolloService).singleton(),
  baseAuthService: asClass(BaseAuthService).singleton(),
  authService: asClass(CachedAuthService).singleton(),
  cache: asClass(CacheLocalStorage).singleton(),

  // Repositories
  spotRepository: asClass(SpotRepositoryGql).singleton(),

  // Use case
  getSpot: asClass(GetSpot).singleton(),
  searchSpots: asClass(SearchSpots).singleton(),
  createSpot: asClass(CreateSpot).singleton()
};

container.register(dependencies as any);

export * from "./Provider";
export * from "./hooks";
