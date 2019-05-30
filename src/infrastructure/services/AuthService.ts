export interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export type AuthSubscriber = (isLoggedIn: boolean) => void;

export interface AuthService {
  login(accessToken: string, refreshToken: string): void;

  logout(): void;

  getTokens(): Tokens;

  isLoggedIn(): boolean;

  subscribe(subscriber: AuthSubscriber): () => void;

  refreshTokens(): Promise<void>;
}
