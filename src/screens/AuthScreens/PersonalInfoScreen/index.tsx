import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text, Headline, ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import NavButton from '../../../components/Buttons/NavigationButton';
import {loginuser} from '../../../store/Actions/AuthActions';
import {personalItemData as data} from '../../../constants/ConstData';
import ImageModal from '../../../components/Profile/ImageModal';
import {showMessage} from 'react-native-flash-message';

const PersonalInfoScreen = () => {
  const route = useRoute();
  const auth = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();

  // @ts-ignore
  const [values, setValues] = useState(route.params.values);
  console.log(values);
  const [imageData, setImageData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialUri = require('../../../assets/images/default-avatar.jpg');
  const [uri, setUri] = useState(null);

  const [bg, setBg] = useState(data[0].background);
  const [gender, setGender] = useState(data[0].gender);

  const {navigate, goBack} = useNavigation();
  const submitHandler = async () => {
    let final = {...values, gender, isNew: true};
    const data = new FormData();
    if (!imageData) {
      showMessage({
        message: 'Please select a profile photo',
        type: 'warning',
        backgroundColor: '#ff9e00',
        color: '#FFF',
      });
      return;
    }
    // @ts-ignore
    if (imageData && uri) {
      data.append('file', imageData);
    }
    for (let item in final) {
      data.append(item, final[item]);
    }

    dispatch(loginuser(data, navigate));
    // @ts-ignore
  };
  return (
    <SafeAreaView style={styles.container}>
      <Headline numberOfLines={2} style={styles.title}>
        Choose your Gender {'\n'}and Profile Photo
      </Headline>
      <View style={styles.card}>
        <View key={bg}>
          <Image source={bg} blurRadius={60} style={styles.ImageOne} />
        </View>
        <View style={styles.viewOuterOne}>
          <View style={styles.viewInnerOne}>
            <View style={styles.viewInnerInnerOne}>
              <Text style={styles.textOne}>{values.firstName}</Text>
              <Text style={styles.textTwo}>{values.lastName}</Text>
            </View>
            <Text style={styles.textThree}>{gender}</Text>
          </View>
          <View style={styles.viewInnerTwo}>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              {!loading ? (
                <Image
                  source={!uri ? initialUri : {uri}}
                  style={styles.ImageTwo}
                />
              ) : (
                <ActivityIndicator animating color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.viewOuterTwo}>
        {data.map((each, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setGender(each.gender);
                setBg(each.background);
              }}>
              <Image
                source={each.avatar}
                style={styles.ImageThree}
                /* @ts-ignore */
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <NavButton
        onPress={submitHandler}
        sending={auth.loading}
        text={!auth.loading ? 'Complete profile' : 'finishing signup'}
      />
      <ImageModal
        setUri={setUri}
        setVisible={setVisible}
        visible={visible}
        setLoading={setLoading}
        setImageData={setImageData}
      />
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
