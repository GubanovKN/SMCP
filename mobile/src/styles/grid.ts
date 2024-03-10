import {makeStyles} from '@rneui/themed';

export const useGridStyles = makeStyles(theme => ({
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    alignContent: 'center',
  },
  header: {
    color: theme.colors.primary,
    fontSize: 24,
    marginStart: theme.spacing.xl,
    marginTop: theme.spacing.sm,
  },
  container: {
    paddingStart: theme.spacing.xl,
    paddingEnd: theme.spacing.xl,
  },
  containerFluid: {
    paddingStart: theme.spacing.md,
    paddingEnd: theme.spacing.md,
  },
  content: {
    marginTop: theme.spacing.md,
  },
  blockFlex: {
    flex: 1,
  },
  blockFlexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  blockFlexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  width10: {
    width: '10%',
  },
  width20: {
    width: '20%',
  },
  width30: {
    width: '30%',
  },
  width40: {
    width: '40%',
  },
  width50: {
    minWidth: '50%',
  },
  width60: {
    width: '60%',
  },
  width70: {
    width: '70%',
  },
  width80: {
    width: '80%',
  },
  width90: {
    width: '90%',
  },
  width100: {
    width: '100%',
  },
  paddingHorizontalSm: {
    paddingHorizontal: theme.spacing.sm,
  },
  paddingVerticalSm: {
    paddingVertical: theme.spacing.sm,
  },
  paddingHorizontalMd: {
    paddingHorizontal: theme.spacing.md,
  },
  paddingVerticalMd: {
    paddingVertical: theme.spacing.md,
  },
  paddingHorizontalLg: {
    paddingHorizontal: theme.spacing.lg,
  },
  paddingVerticalLg: {
    paddingVertical: theme.spacing.lg,
  },
  paddingHorizontalXl: {
    paddingHorizontal: theme.spacing.xl,
  },
  paddingVerticalXl: {
    paddingVertical: theme.spacing.xl,
  },
  marginHorizontalSm: {
    marginHorizontal: theme.spacing.sm,
  },
  marginVerticalSm: {
    marginVertical: theme.spacing.sm,
  },
  marginHorizontalMd: {
    marginHorizontal: theme.spacing.md,
  },
  marginVerticalMd: {
    marginVertical: theme.spacing.md,
  },
  marginHorizontalLg: {
    marginHorizontal: theme.spacing.lg,
  },
  marginVerticalLg: {
    marginVertical: theme.spacing.lg,
  },
  marginHorizontalXl: {
    marginHorizontal: theme.spacing.xl,
  },
  marginVerticalXl: {
    marginVertical: theme.spacing.xl,
  },
}));
