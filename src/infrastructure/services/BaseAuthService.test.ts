import { BaseAuthService } from "./BaseAuthService";
import { Cache } from "./Cache";

describe("BaseAuthService", () => {
  let authService: BaseAuthService;

  beforeEach(() => {
    authService = new BaseAuthService();
  });

  it("login: should set the access token", () => {
    // Given
    const accessToken = "access-token";

    // When
    authService.login(accessToken, "");

    // Then
    expect(authService.getTokens().accessToken).toEqual(accessToken);
  });

  it("login: should set the refresh token", () => {
    // Given
    const refreshToken = "refresh-token";

    // When
    authService.login("", refreshToken);

    // Then
    expect(authService.getTokens().refreshToken).toEqual(refreshToken);
  });

  it("logout: should reset the access token", () => {
    // Given
    const accessToken = "access-token";
    authService.login(accessToken, "");

    // When
    authService.logout();

    // Then
    expect(authService.getTokens().accessToken).toBeNull();
  });

  it("logout: should reset the refresh token", () => {
    // Given
    const refreshToken = "refresh-token";
    authService.login("", refreshToken);

    // When
    authService.logout();

    // Then
    expect(authService.getTokens().refreshToken).toBeNull();
  });

  it("getTokens: should return the tokens", () => {
    // Given
    const accessToken = "access-token";
    const refreshToken = "refresh-token";
    authService.login(accessToken, refreshToken);

    // When
    const result = authService.getTokens();

    // Then
    expect(result).toEqual({
      accessToken,
      refreshToken
    });
  });

  it("isLoggedIn: should return true when the access token is set", () => {
    // Given
    const accessToken = "access-token";
    authService.login(accessToken, "");

    // When
    const result = authService.isLoggedIn();

    // Then
    expect(result).toBe(true);
  });

  it("isLoggedIn: should return false when the access token is not set", () => {
    // When
    const result = authService.isLoggedIn();

    // Then
    expect(result).toBe(false);
  });

  it("subscribe: should set a new listener", () => {
    // Given
    const subscriber = jest.fn();

    // When
    authService.subscribe(subscriber);
    authService.login("", "");
    authService.logout();

    // Then
    expect(subscriber).toHaveBeenCalledTimes(2);
    expect(subscriber).toHaveBeenNthCalledWith(1, true);
    expect(subscriber).toHaveBeenNthCalledWith(2, false);
  });
});
