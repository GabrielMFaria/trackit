import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Lexend Deca', sans-serif;
    background-color: #ffffff;
  }

  input, button {
    font-family: 'Lexend Deca', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    width: 100%;
    height: 45px;
    background-color: #52b6ff;
    color: #ffffff;
    font-size: 21px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

export default GlobalStyle;
