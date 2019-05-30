import { ThemeDefinition } from "./theme";

type Spacing = keyof ThemeDefinition["spacing"];
type FontSize = keyof ThemeDefinition["fontSize"];
type Color = keyof ThemeDefinition["color"];

interface StyledProps {
  theme: ThemeDefinition;
}

export const spacing = (which: Spacing) => ({ theme }: StyledProps) =>
  theme.spacing[which];

export const fontSize = (which: FontSize) => ({ theme }: StyledProps) =>
  theme.fontSize[which];

export const color = (which: Color) => ({ theme }: StyledProps) =>
  theme.color[which];
