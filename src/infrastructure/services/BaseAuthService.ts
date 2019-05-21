import { AuthService, AuthSubscriber } from "./AuthService";

export class BaseAuthService implements AuthService {
  private accessToken: string | null;
  private refreshToken: string | null;
  private subscribers: AuthSubscriber[];

  public constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.subscribers = [];
  }

  public login(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.subscribers.forEach(subscriber => subscriber(true));
  }

  public logout() {
    this.accessToken = null;
    this.refreshToken = null;

    this.subscribers.forEach(subscriber => subscriber(false));
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

  public subscribe(subscriber: AuthSubscriber) {
    this.subscribers.push(subscriber);

    return () => {
      this.subscribers = this.subscribers.filter(x => x !== subscriber);
    };
  }
}
