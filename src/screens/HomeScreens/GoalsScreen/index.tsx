import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Title, Subheading, List} from 'react-native-paper';
import AngleLeftIcon from '@iconscout/react-native-unicons/icons/uil-angle-left-b';
import RNBounceable from '@freakycoder/react-native-bounceable';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  View,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const image = require('../../../assets/images/goals.png');

export default function GoalsScreen() {
  const {goBack, navigate} = useNavigation();

  const goalOnPress = () => {
    showMessage({
      message: 'Goals are coming soon, stay tuned!',
      duration: 1500,
      type: 'default',
      backgroundColor: '#ff9100',
      color: '#FFF',
    });
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      {/* <StatusBar
        animated={false}
        backgroundColor="transparent"
        translucent={true}
      /> */}
      <TouchableOpacity onPress={() => goBack()}>
        <AngleLeftIcon style={styles.backButton} size="30" color="#000" />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <View style={styles.sectionOne}>
          <Image
            source={require('../../../assets/images/medal.png')}
            resizeMode="cover"
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <View style={styles.sectionTwo}>
          <View style={styles.cardContent}>
            <Title style={styles.title}>Choose your Goal</Title>
            <Subheading style={styles.description}>
              Goals are designed to keep you focussed {'\n'} and productive. No
              distractions ⭐
            </Subheading>
          </View>
          <View style={styles.listGroup}>
            <RNBounceable bounceEffect={0.97} onPress={() => goBack()}>
              <List.Item
                title="IITJEE"
                description="Engineering"
                titleStyle={styles.titleStyle}
                style={styles.listItem}
                right={() => <List.Icon color="#000" icon="chevron-right" />}
                left={() => (
                  <FastImage
                    style={styles.avatar}
                    resizeMode={FastImage.resizeMode.cover}
                    source={require('../../../assets/images/civil.png')}
                  />
                )}
              />
            </RNBounceable>
            <RNBounceable bounceEffect={0.97} onPress={goalOnPress}>
              <List.Item
                title="NEET"
                description="Medical"
                titleStyle={styles.titleStyle}
                style={styles.listItem}
                right={() => <List.Icon color="#000" icon="chevron-right" />}
                left={() => (
                  <FastImage
                    style={styles.avatar}
                    resizeMode={FastImage.resizeMode.cover}
                    source={require('../../../assets/images/brain.png')}
                  />
                )}
              />
            </RNBounceable>
            <RNBounceable bounceEffect={0.97} onPress={goalOnPress}>
              <List.Item
                title="CAT"
                description="Management"
                titleStyle={styles.titleStyle}
                style={styles.listItem}
                right={() => <List.Icon color="#000" icon="chevron-right" />}
                left={() => (
                  <FastImage
                    style={styles.avatar}
                    resizeMode={FastImage.resizeMode.cover}
                    source={require('../../../assets/images/money.png')}
                  />
                )}
              />
            </RNBounceable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
