import { createGlobalStyle } from "styled-components";
import { lightTheme } from "./theme";
import { normalize } from "styled-normalize";

// TODO support toggle theme
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  p {
    font-size: 1rem;
    line-height: 2rem;
  }
  a {
    color: ${lightTheme.colors.anchor};
    text-decoration: none
  }
  li {
      font-size: 1rem;
      line-height: 1.5rem;
  }
`;
