import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export const styles = StyleSheet.create({
  post: {
    backgroundColor: '#fff',
    marginBottom: 2,
    marginTop: 8,
    borderRadius: 0,
    paddingBottom: 6,
  },
  customListView: {
    padding: 15,
    width: screenWidth - 40,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  infoWrapper: {
    marginLeft: 8,
  },
  namesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  imageContainer: {
    marginTop: 10,
    flex: 1,
    alignSelf: 'center',
  },
  paragraph: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  postImage: {
    width: screenWidth - 35,
    height: 180,
    borderRadius: 12,
  },
  postFooter: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
  },
  voteContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  upVoteIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -2,
  },

  commentIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    marginLeft: 16,
  },
  reactionText: {
    fontSize: 13,
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
  shareIcon: {
    position: 'absolute',
    paddingLeft: 20,
    paddingVertical: 10,
    right: 0,
  },

  // postHeader

  viewOuter: {flexDirection: 'row', alignItems: 'center'},
  postHeader: {fontSize: 14, fontFamily: 'Inter-Bold', color: '#1E2022'},
  time: {
    color: 'gray',
    fontSize: 12,
    marginRight: 5,
    fontFamily: 'Inter-Regular',
  },
  postedBy: {
    fontSize: 12,
    marginLeft: 5,
    color: 'gray',
    fontFamily: 'Inter-Regular',
  },
  menu: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    bottom: 5,
  },
  menuContainer: {
    borderRadius: 12,
    backgroundColor: '#F2F4FB',
  },
});
