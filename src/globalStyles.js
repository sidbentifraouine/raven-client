import { injectGlobal } from 'styled-components'
import variables from './constants/styles'

injectGlobal`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    src: url(${require('./assets/fonts/OpenSans/OpenSans-Light.ttf')}) format('truetype');
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: url(${require('./assets/fonts/OpenSans/OpenSans-Regular.ttf')}) format('truetype');
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    src: url(${require('./assets/fonts/OpenSans/OpenSans-Bold.ttf')}) format('truetype');
  }

  body {
    font-family: ${variables.preferredFont};
    font-size: ${variables.fontSizeNormal};
    font-weight: ${variables.fontWeightNormal};
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`
