import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  background-image: url('/images/FondoPrincipal.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  font-family: 'Arial', sans-serif;
}


  h1 {
    background: white; 
    display: inline; 
    padding: 0.5em; 
  }
`;


export default GlobalStyle;
