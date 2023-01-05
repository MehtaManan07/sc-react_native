import {StyleSheet, Platform} from 'react-native';
import {Theme} from '../../../constants/appTheme';

const styles = StyleSheet.create({
  cardStyles: {
    borderRadius: 12,
    backgroundColor: '#F8F8F9',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingTop: 2,
    paddingBottom: 12,
  },
  cardTitle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  listTitle: {
    color: '#828282',
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Inter-Medium',
  },
  listContent: {
    color: '#000',
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginTop: 8,
    backgroundColor: '#F8F8F9',
  },
  listLinkContent: {
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'underline',
    fontSize: 14,
    color: 'dodgerblue',
  },
});

export default styles;
