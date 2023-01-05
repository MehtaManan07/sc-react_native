import * as React from 'react';
import {Animated, Image, View, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavButton from '../../../components/Buttons/NavigationButton';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const {width, height} = Dimensions.get('screen');
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {welcomeData} from '../../../constants/ConstData';
import auth from '@react-native-firebase/auth';
// @ts-ignore
import {GOOGLE_WEB_CLIENT_ANDROID} from '@env';
import {capitalizeFirstLetter} from '../../../constants/functions';
import {getNames} from '../../../store/Actions/CommunityActions';
import {loginuser} from '../../../store/Actions/AuthActions';
import {useDispatch} from 'react-redux';

export default function WelcomeScreen() {
  const {navigate, goBack} = useNavigation();

  // const submitHandler = () => {
  //   // @ts-ignore
  //   navigate('PhoneScreen');
  // };
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const submitHandler = async () => {
    setLoading(true);
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const googleUser = await auth().signInWithCredential(googleCredential);
      const {user, additionalUserInfo} = googleUser;
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      if (additionalUserInfo?.isNewUser) {
        const values = {
          // @ts-ignore
          firstName: `${capitalizeFirstLetter(user.displayName.split(' ')[0])}`,
          // @ts-ignore
          lastName: `${capitalizeFirstLetter(user.displayName.split(' ')[1])}`,
          email: user.email,
          phoneNum: user.phoneNumber,
        };
        setLoading(false);
        // @ts-ignore
        navigate('PersonalInfoScreen', {values});
      } else {
        setLoading(false);
        await dispatch(loginuser({email: user.email, isNew: false}, navigate));
        await dispatch(getNames());
      }
    } catch (error: any) {
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log({cancel: error});
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log({progress: error});
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log({error});
        // some other error happened
      }
    }
  };
  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ANDROID,
      offlineAccess: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={welcomeData}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        style={styles.animated}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={item => item.key}
        pagingEnabled
        horizontal
        renderItem={({item, index}) => {
          return (
            <View style={styles.outerAnimated}>
              <View style={styles.innerOneAnimated}>
                <Image source={item.image} style={styles.imageAnimated} />
              </View>
              <View style={styles.innerTwoAnimated}>
                <Text
                  style={styles.textAnimated}
                  numberOfLines={2}
                  adjustsFontSizeToFit>
                  {item.title}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.outer}>
        <View style={styles.inner}>
          {welcomeData.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  ...styles.animatedLast,
                  opacity,
                  transform: [
                    {
                      scale,
                    },
                  ],
                }}
              />
            );
          })}
        </View>
        <NavButton
          icon={{
            uri: 'https://img.icons8.com/material/50/000000/google-logo--v2.png',
          }}
          onPress={submitHandler}
          text="Join with Google"
          sending={loading}
        />
      </View>
    </SafeAreaView>
  );
}
