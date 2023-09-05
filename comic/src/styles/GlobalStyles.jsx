// create GlobalStyle component
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;


    }
    :root{
        --white-color:#f5f5f5;
        --red-color:#c70039;
        --red-color-hover:#900c3f;
        --blue-color:#4936f4;
        --border-color:#ccc;
        --pure-white-color:#fff;
        
        --color-grey:#b9bbbe;
        
        --font-primary: sans-serif;
        --font-comic: 'Comic Neue', cursive;
        --text-shadow:0px 0px 10px rgba(0,0,0,0.5);
        --box-shadow:0px 0px 10px rgba(0,0,0,0.5);



    }
`;
export default GlobalStyles;
