import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    justifyContent: 'flex-end',
    bottom: 0,
    borderRadius: 8,
    borderWidth: 1,
    color: '#000',
    borderColor: '#1A1A1A0D',
    backgroundColor: '#FAFAFA',
    flex: 1,
    marginHorizontal: 16,
    height: 'auto',
    minHeight: 50,
    maxHeight: 150,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 13,
    marginBottom: 5,
    fontSize: 15,
  },
  icon: {marginTop: 18, marginLeft: -8, marginRight: 10},
  textInputContainer: {
    flexDirection: 'row',
    borderColor: '#000',
    paddingBottom: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default styles;
