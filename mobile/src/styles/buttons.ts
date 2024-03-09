import {makeStyles} from '@rneui/themed';

export const useButtonStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  buttonPrimaryOutline: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.grey0,
    borderColor: theme.colors.grey0,
  },
  label: {
    color: theme.colors.black,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  labelPrimary: {
    color: theme.colors.white,
  },
  labelPrimaryOutline: {
    color: theme.colors.black,
  },
  labelSecondary: {
    color: theme.colors.black,
  },
}));
