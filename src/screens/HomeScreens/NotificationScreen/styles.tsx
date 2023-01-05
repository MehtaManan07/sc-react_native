import {StyleSheet, Platform} from 'react-native';
import {Theme} from '../../../constants/appTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  listGroup: {
    marginHorizontal: 12,
    marginTop: 20,
    flexDirection: 'column',
  },
  listItem: {
    backgroundColor: '#edf2fb',
    borderRadius: 12,
    marginVertical: 5,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '100%',
    justifyContent: 'center',
  },
  titleStyle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  avatar: {
    width: 50,
    alignSelf: 'center',
    borderRadius: 25,
    height: 50,
    marginRight: 10,
    // marginLeft: 10,
  },
  announcementContainer: {
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'column',
  },
  heroText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 30,
    color: Theme.colors.success,
  },
  supportingText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333533',
  },
});

export default styles;
