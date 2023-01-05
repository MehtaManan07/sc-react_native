import {StyleSheet} from 'react-native';
import layout from '../../../constants/appLayout';
import {Theme} from '../../../constants/appTheme';
import {Dimensions} from 'react-native';

const {
  window: {height, width},
  isSmallDevice,
} = layout;

const screenWidth = Math.round(Dimensions.get('window').width);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: Theme.colors.background,
    flex: 1,
    marginBottom: 72,
  },
  customListView: {
    width: screenWidth - 40,
    flexDirection: 'row',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  infoWrapper: {
    marginLeft: 12,
  },
  namesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    elevation: 0,
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  listGroup: {
    marginHorizontal: 10,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'column',
  },
  communityListItem: {
    backgroundColor: '#f5f3f4',
    borderRadius: 16,
    marginVertical: 5,
    height: 50,
    width: screenWidth - 100,
  },
  communityTitleStyle: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
    fontFamily: 'Inter-Medium',
  },
  modalCommunityTitle: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Inter-Bold',
  },
  modalContainerStyle: {
    backgroundColor: Theme.colors.background,
    padding: 20,
    height: 260,
    borderRadius: 12,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonStyles: {
    borderRadius: 12,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  postButtonLabelStyles: {
    color: '#10194A',
    textTransform: 'none',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },

  postButtonContentStyles: {
    height: 44,
    width: 159,
  },
  editor: {
    fontSize: 18,
    textAlignVertical: 'top',
    flex: 1,
    fontFamily: 'Lato-Regular',
    color: 'black',
    marginTop: 10,
    marginBottom: 24,
    height: 'auto',
    minHeight: 80,
    borderRadius: 10,
  },
  imageContainer: {
    width: 'auto',
    height: 'auto',
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  touchableOpacity: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
  },
  listIcon: {
    borderRadius: 15,
    height: 30,
    width: 30,
    backgroundColor: '#bbb',
  },
});
