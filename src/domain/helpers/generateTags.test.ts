import { generateTags } from "./generateTags";

describe("generateTags", () => {
  it('should return "#skatepark"', () => {
    // Given
    const input = "skatepark";

    // When
    const result = generateTags(input);

    // Then
    expect(result).toEqual("#skatepark");
  });

  it('should return "#chillMode"', () => {
    // Given
    const input = "chill-mode";

    // When
    const result = generateTags(input);

    // Then
    expect(result).toEqual("#chillMode");
  });

  it('should return "#chillMode"', () => {
    // Given
    const input = "#chillMode";

    // When
    const result = generateTags(input);

    // Then
    expect(result).toEqual("#chillMode");
  });

  it('should return ""', () => {
    // Given
    const input = " ";

    // When
    const result = generateTags(input);

    // Then
    expect(result).toEqual("");
  });

  it('should return "#skatepark #chillMode"', () => {
    // Given
    const input = "skatepark  chill-mode";

    // When
    const result = generateTags(input);

    // Then
    expect(result).toEqual("#skatepark #chillMode");
  });

  it('should return "#skatepark #chillMode "', () => {
    // Given
    const input = "skatepark  chill-mode ";

    // When
    const result = generateTags(input);

    // Then
    expect(result).toEqual("#skatepark #chillMode ");
  });
});
