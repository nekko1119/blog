import { createGlobalStyle } from "styled-components";
import { lightTheme } from "./theme";
import { normalize } from "styled-normalize";

// TODO support toggle theme
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
  }
  p {
    font-size: 1rem;
    line-height: 2rem;
  }
  a {
    color: ${lightTheme.colors.text};
    text-decoration: underline;
  }
  li {
      font-size: 1rem;
      line-height: 1.5rem;
  }
`;
