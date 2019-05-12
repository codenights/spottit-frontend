import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

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
    font-size: 1.6rem;
    font-family: 'PT Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;

const theme = {};
