import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { lightTheme, darkTheme } from "../theme";
import { ThemeContext } from "../themeContext";
import { GlobalStyle } from "../globalStyle";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);
  }, [setIsDark, isDark]);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return (
    <>
      <GlobalStyle />
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {isMounted && <Component {...pageProps} />}
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
