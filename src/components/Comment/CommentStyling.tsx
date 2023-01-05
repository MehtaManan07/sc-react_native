import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingTop: 18,
  },

  image: {
    width: 40,
    borderRadius: 20,
    height: 40,
    marginRight: 10,
  },

  replyImage: {
    width: 28,
    borderRadius: 14,
    height: 28,
    marginRight: 10,
    marginLeft: 65,
  },

  wrapper: {
    flex: -1,
    height: 'auto',
    backgroundColor: '#F2F3F5',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  content: {
    paddingHorizontal: 10,
    paddingBottom: 8,
    fontSize: 14,
    paddingTop: 4,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentOwner: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    paddingBottom: 0,
    fontWeight: 'bold',
  },
  commentFooter: {
    flexDirection: 'row',
    marginLeft: 80,
    marginBottom: 15, //between each post
  },
  replyFooter: {
    flexDirection: 'row',
    marginLeft: 140,
    marginTop: 2,
    marginBottom: 15, //between each post
  },
  commentDate: {
    marginRight: 14,
    marginTop: 10,
    fontSize: 12,
    color: 'black',
  },
  footerElement: {
    marginRight: 14,
    marginTop: 4,
    fontSize: 14,
    color: 'black',
  },
  footerElementLiked: {
    marginRight: 10,
    color: '#00AAFF',
  },
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
  },
});
