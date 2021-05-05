import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });
