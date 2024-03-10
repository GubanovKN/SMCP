import {makeStyles} from '@rneui/themed';

export const useTextStyles = makeStyles(theme => ({
  base: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    color: theme.colors.black,
  },
  bold: {
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 24,
  },
  h2: {
    fontSize: 20,
  },
  h3: {
    fontSize: 16,
  },
  h4: {
    fontSize: 14,
  },
  h5: {
    fontSize: 12,
  },
  h6: {
    fontSize: 10,
  },
}));
