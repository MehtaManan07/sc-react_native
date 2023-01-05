import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Colors, List, Subheading, ActivityIndicator} from 'react-native-paper';
import ProfileButton from '../Buttons/ProfileButton';
import ProfileInput from '../TextInput/ProfileInput';
import ImageModal from './ImageModal';
import {useSelector, useDispatch} from 'react-redux';
import {updateuser} from '../../store/Actions/AuthActions';
import {showMessage} from 'react-native-flash-message';

interface Props {
  styles: any;
  values: any;
  setValues: any;
  usernames: any;
}
const EditProfileForm = ({styles, values, setValues, usernames}: Props) => {
  const dispatch = useDispatch();
  const {user, loading} = useSelector((state: any) => state.Auth);
  const [visible, setVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [uri, setUri] = useState(null);
  const [imageData, setImageData] = useState(null);
  const submitHandler = () => {
    if (usernames.includes(values.username)) {
      showMessage({
        message: `Username ${values.username} is already taken`,
        type: 'danger',
      });
      return;
    }
    const data = new FormData();
    if (imageData && uri) {
      data.append('file', imageData);
    }
    for (let item in values) {
      if (item !== 'avatar') {
        data.append(item, values[item]);
      }
    }
    dispatch(updateuser(data, user._id));
  };

  useEffect(() => {
    setValues({...values, avatar: uri});
  }, [uri]);
  return (
    <KeyboardAvoidingView enabled>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}
        style={styles.scrollStyle}>
        <View style={styles.viewOne}>
          <View style={styles.viewTwo}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              activeOpacity={0.5}
              style={styles.touchableOpacityOne}>
              <List.Icon
                color={Colors.black}
                icon="pencil"
                style={styles.listIconOne}
              />
            </TouchableOpacity>
            {imageLoading ? (
              <ActivityIndicator animating color="#000" />
            ) : (
              <FastImage
                style={styles.imageOne}
                source={{
                  uri: uri ? uri : values.avatar,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          </View>
        </View>
        <ProfileInput
          label="First Name"
          value={values.firstName}
          onChange={val => setValues({...values, firstName: val})}
        />
        <ProfileInput
          label="Last Name"
          value={values.lastName}
          onChange={val => setValues({...values, lastName: val})}
        />
        <ProfileInput
          label="Username"
          onChange={val => setValues({...values, username: val})}
          value={values.username}
        />
        <View style={styles.content}>
          <Subheading style={styles.subHeading}>Bio</Subheading>
          <TextInput
            style={styles.editor}
            selectionColor={'#c8e7ff'}
            placeholderTextColor={'#adb5bd'}
            maxLength={300}
            multiline
            textBreakStrategy={'highQuality'}
            autoCompleteType={'off'}
            caretHidden={false}
            autoCapitalize="sentences"
            keyboardType="default"
            underlineColorAndroid="#BDBDBD"
            returnKeyType="next"
            value={values.bio}
            onChangeText={val => setValues({...values, bio: val})}
          />
        </View>
        <ProfileButton
          text={!loading ? 'Save' : 'Saving'}
          submitHandler={submitHandler}
          loading={loading}
        />
        <ImageModal
          setLoading={setImageLoading}
          setUri={setUri}
          setVisible={setVisible}
          visible={visible}
          setImageData={setImageData}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileForm;

const styles = StyleSheet.create({});
