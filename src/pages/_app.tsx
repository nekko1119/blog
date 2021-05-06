import React from "react";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { lightTheme } from "../theme";
import { GlobalStyle } from "../globalStyle";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
