import {StyleSheet, StatusBar} from 'react-native';
import {Theme} from '../../../constants/appTheme';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: '#C9E6FC',
    // paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    marginLeft: 14,
    marginTop: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionOne: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTwo: {
    flex: 1.1,
    borderRadius: 20,
    backgroundColor: 'ghostwhite',
    opacity: 0.8,
    paddingHorizontal: 4,
    paddingVertical: 16,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    color: '#1E2022',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    color: '#828282',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  listGroup: {
    marginHorizontal: 12,
    marginTop: 20,
    flexDirection: 'column',
  },
  listItem: {
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '100%',
    paddingRight: -5,
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  avatar: {
    width: 40,
    alignSelf: 'center',
    // borderRadius: 12,
    height: 40,
    marginRight: 10,
    marginLeft: 5,
  },
});

export default styles;
