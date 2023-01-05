import {StyleSheet} from 'react-native';
import layout from '../../../constants/appLayout';
import {Theme} from '../../../constants/appTheme';
import {Dimensions} from 'react-native';

const {
  window: {height, width},
  isSmallDevice,
} = layout;

const BORDER_RADIUS = 10;
const ITEM_WIDTH = 100;
const ITEM_HEIGHT = 120;

const screenWidth = Math.round(Dimensions.get('window').width);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  headline: {
    fontSize: 28,
    color: Theme.colors.text,
    textAlign: 'left',
    fontFamily: 'Gilroy-Bold',
  },
  pickerButton: {
    paddingVertical: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  pickerButtonActiveText: {
    fontFamily: 'Gilroy-Bold',
    color: '#007f5f',
    fontSize: 24,
    marginRight: 10,
  },
  pickerButtonMenuIcon: {
    color: 'black',
  },

  joinedCommunities: {
    backgroundColor: '#faa307',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: BORDER_RADIUS,
  },
  listContainter: {
    //
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#D6E1FD',
  },
});
