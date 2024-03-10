import {makeStyles} from '@rneui/themed';

export const useTextInputStyles = makeStyles(theme => ({
  container: {
    paddingHorizontal: 0,
    borderBottomWidth: 0,
  },
  input: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    backgroundColor: theme.colors.grey0,
    color: theme.colors.black,
    fontSize: 24,
    letterSpacing: 0,
    paddingHorizontal: theme.spacing.md,
  },
  inputSuccess: {
    borderColor: theme.colors.success,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputErrorMessageNone: {
    display: 'none',
  },
  label: {
    color: theme.colors.grey2,
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
  },
}));

export const useCheckInputStyles = makeStyles(theme => ({
  container: {
    marginStart: 5,
    marginEnd: 0,
    paddingEnd: 0,
    marginBottom: 0,
    paddingTop: 0,
    width: 'auto',
  },
  input: {
    height: 15,
    borderRadius: 15,
    borderWidth: 0,
    color: 'green',
    fontSize: 10,
    letterSpacing: 15,
    paddingStart: 15,
    paddingEnd: 15,
  },
  label: {
    color: theme.colors.grey2,
    fontSize: 10,
    fontWeight: '400',
    marginLeft: 5,
    marginTop: 7,
    marginBottom: 0,
  },
  labelSecondary: {
    color: theme.colors.black,
    fontSize: 10,
    fontWeight: '400',
    marginLeft: 6,
    paddingRight: 80,
  },
}));

export const useSelectDropdownStyles = makeStyles(theme => ({
  button: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    backgroundColor: theme.colors.grey0,
    paddingHorizontal: theme.spacing.md,
    width: '100%',
  },
  text: {
    textAlign: 'left',
    color: theme.colors.black,
    fontSize: 24,
    letterSpacing: 0,
  },
  dropdown: {
    backgroundColor: theme.colors.grey0,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 15,
  },
  rowText: {
    color: theme.colors.black,
  },
  selectedRow: {
    backgroundColor: theme.colors.grey0,
  },
  selectedRowText: {
    color: theme.colors.primary,
  },
}));
