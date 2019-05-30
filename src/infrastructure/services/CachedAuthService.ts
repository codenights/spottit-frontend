import { AuthService, AuthSubscriber } from "./AuthService";
import { Cache } from "./Cache";

interface Dependencies {
  baseAuthService: AuthService;
  cache: Cache;
}

export class CachedAuthService implements AuthService {
  private authService: AuthService;
  private cache: Cache;

  public constructor({ baseAuthService, cache }: Dependencies) {
    this.authService = baseAuthService;
    this.cache = cache;

    const accessToken = this.cache.getItem("accessToken");
    const refreshToken = this.cache.getItem("refreshToken");

    if (accessToken && refreshToken) {
      this.authService.login(accessToken, refreshToken);
    }
  }

  public getTokens() {
    return this.authService.getTokens();
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public login(accessToken: string, refreshToken: string) {
    this.authService.login(accessToken, refreshToken);

    this.cache.setItem("accessToken", accessToken);
    this.cache.setItem("refreshToken", refreshToken);
  }

  public logout() {
    this.authService.logout();

    this.cache.removeItem("accessToken");
    this.cache.removeItem("refreshToken");
  }

  public subscribe(subscriber: AuthSubscriber) {
    return this.authService.subscribe(subscriber);
  }

  public refreshTokens() {
    return this.authService.refreshTokens().then(value => {
      const accessToken = this.authService.getTokens().accessToken;

      if (accessToken) {
        this.cache.setItem("accessToken", accessToken);
      }

      return value;
    });
  }
}
