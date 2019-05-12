import { Cache } from "./Cache";

interface Dependencies {
  cache: Cache;
}

type Subscriber = (isLoggedIn: boolean) => void;

export class AuthService {
  private cache: Cache;
  private accessToken: string | null;
  private refreshToken: string | null;
  private subscribers: Subscriber[];

  public constructor({ cache }: Dependencies) {
    this.cache = cache;
    this.accessToken = this.cache.getItem("accessToken");
    this.refreshToken = this.cache.getItem("refreshToken");
    this.subscribers = [];
  }

  public login(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.cache.setItem("accessToken", this.accessToken);
    this.cache.setItem("refreshToken", this.refreshToken);

    this.subscribers.forEach(subscriber => subscriber(this.isLoggedIn()));
  }

  public logout() {
    this.accessToken = null;
    this.refreshToken = null;

    this.cache.removeItem("accessToken");
    this.cache.removeItem("refreshToken");

    this.subscribers.forEach(subscriber => subscriber(this.isLoggedIn()));
  }

  public getTokens() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    };
  }

  public isLoggedIn() {
    return Boolean(this.accessToken);
  }

  public subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);

    return () => {
      this.subscribers = this.subscribers.filter(x => x !== subscriber);
    };
  }
}
