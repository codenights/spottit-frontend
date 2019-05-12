import { Resolver } from "awilix";

import { GraphQlService } from "../infrastructure/services/Graphql";
import { AuthService } from "../infrastructure/services/AuthService";
import { Cache } from "../infrastructure/services/Cache";
import { SpotRepository } from "../domain/repository/SpotRepository";
import { GetSpot } from "../domain/usecase/GetSpot";
import { SearchSpots } from "../domain/usecase/SearchSpots";

export interface DiContainer {
  // Configuration
  apiUrl: Resolver<string>;

  // Services
  graphqlService: Resolver<GraphQlService>;
  authService: Resolver<AuthService>;
  cache: Resolver<Cache>;

  // Repositories
  spotRepository: Resolver<SpotRepository>;

  // Use case
  getSpot: Resolver<GetSpot>;
  searchSpots: Resolver<SearchSpots>;
}

export type DependencyKey = keyof DiContainer;

export type GetDependencyType<
  T extends DependencyKey
> = DiContainer[T] extends Resolver<infer U> ? U : never;
