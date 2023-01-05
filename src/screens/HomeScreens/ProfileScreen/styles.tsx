import {StyleSheet} from 'react-native';
import layout from '../../../constants/appLayout';
import {Theme} from '../../../constants/appTheme';

const {
  window: {height, width},
  isSmallDevice,
} = layout;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 3,
    backgroundColor: Theme.colors.background,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 70,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.text,
  },

  headContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },

  imageContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },

  text: {
    color: Theme.colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // backgroundColor: 'pink',
  },

  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 60,
    margin: 8,
  },

  subText: {
    fontSize: 10,
    color: '#4A5568',
    textTransform: 'uppercase',
    fontFamily: 'Inter-Regular',
  },

  bioText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    color: Theme.colors.text,
    lineHeight: 21,
    paddingVertical: 10,
  },

  infoContainer: {
    marginVertical: 10,
  },

  statsBox: {
    alignItems: 'center',
    flex: 1,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },

  // additonal styles add

  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  mainAvatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },

  extraInfoWrapper: {
    flexDirection: 'row',
    width: width - 40 - 80,
    justifyContent: 'space-evenly',
  },

  bioWrapper: {
    paddingHorizontal: 15,
    marginTop: 10,
  },

  // additional stats end
});
