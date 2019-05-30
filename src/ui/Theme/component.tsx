import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components/macro";

import { theme } from "./theme";
import { fontSize, color } from "./utils";

export interface ThemeProps {}

export const Theme: React.FC<ThemeProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
);

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62%;
  }

  body {
    font-size: ${fontSize("base")};
    line-height: 1.25;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${color("neutral80")}
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;
