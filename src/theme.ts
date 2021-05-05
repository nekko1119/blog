export type Theme = {
  colors: {
    text: string;
    background: string;
    border: string;
    anchor: string;
  };
  space: number[];
};

const commonTheme: Pick<Theme, "space"> = {
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36],
};

export const lightTheme: Theme = {
  ...commonTheme,
  colors: {
    text: "#222222",
    background: "#ffffff",
    border: "lightgray",
    anchor: "#3290dd",
  },
};

// unused yet
export const darkTheme: Theme = {
  ...commonTheme,
  colors: {
    text: "#dddddd",
    background: "#333333",
    border: "darkgray",
    anchor: "#1664bb",
  },
};

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
