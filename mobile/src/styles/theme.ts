import {createTheme} from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#00DA9F',
    grey0: '#F4F4F4',
    grey1: '#D9D9D9',
    grey2: '#B9B9B9',
    success: '#00DA9F',
    error: '#FF0000',
    black: '#494949',
    background: 'white',
  },
  darkColors: {
    primary: '#00DA9F',
    grey0: '#B9B9B9',
    grey1: '#D9D9D9',
    grey2: '#F4F4F4',
    success: '#00DA9F',
    error: '#FF0000',
    white: '#494949',
    black: '#EAEAEA',
    background: '#494949',
  },
  spacing: {
    xs: 5,
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40,
  },
  components: {
    Button: {
      raised: true,
    },
  },
});
