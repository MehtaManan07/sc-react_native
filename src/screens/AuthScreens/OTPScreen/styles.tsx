import {StyleSheet, Platform} from 'react-native';
import {Theme} from '../../../constants/appTheme';

export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 12;
export const DEFAULT_CELL_BG_COLOR = Theme.colors.background;
export const NOT_EMPTY_CELL_BG_COLOR = Theme.colors.tertiary;
export const ACTIVE_CELL_BG_COLOR = Theme.colors.backgroundSecondary;

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 40,
    paddingHorizontal: 20,
    marginBottom: 50,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: Theme.colors.primary,
    backgroundColor: Theme.colors.background,
    elevation: 3,
  },

  // =======================

  container: {
    flex: 1,
    minHeight: 800,
    paddingTop: 14,
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.background,
  },
  title: {
    marginTop: 50,
    lineHeight: 36,
    color: '#000',
    fontSize: 28,
    textAlign: 'left',
    fontFamily: 'Gilroy-Bold',
    marginBottom: 100,
  },
});

export default styles;
