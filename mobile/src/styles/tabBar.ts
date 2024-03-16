import {makeStyles} from '@rneui/themed';

export const useTabBarStyles = makeStyles(theme => ({
  tab: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderTopColor: theme.colors.primary,
    borderLeftColor: theme.colors.primary,
    borderRightColor: theme.colors.primary,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 0,
    backgroundColor: theme.colors.white,
    borderWidth: 0,
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    bottom: 0,
    right: 0,
    padding: 5,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
  },
}));
