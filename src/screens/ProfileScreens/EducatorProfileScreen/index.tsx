import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import MenuIcon from '@iconscout/react-native-unicons/icons/uil-ellipsis-h';
import {useNavigation} from '@react-navigation/native';
import {Button, Subheading} from 'react-native-paper';
import {styles} from './styles';

export default function EducatorProfileScreen() {
  const {navigate, goBack} = useNavigation();

  const inlineStyle = StyleSheet.create({
    text: {...styles.text, fontSize: 20},
    tag: {...styles.text, color: '#333', fontSize: 14},
    label: {...styles.text, ...styles.subText},
  });

  const bioContent =
    "JEE Aficionado India's Top JEE Mentor and Strategist Author of the best-selling book 'Dominate JEE' AIR 247 in IIT-JEE (in 4 months)";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView overScrollMode={'never'} showsVerticalScrollIndicator={false}>
        <View style={{alignSelf: 'center'}}>
          <FastImage
            style={styles.image}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1347406184920190977/k2PegsXQ_400x400.jpg',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={styles.headContainer}>
          <Text style={inlineStyle.text}>Nishant Jindal</Text>
          <Text style={inlineStyle.tag}>@realnishantjindal</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={inlineStyle.text}>3916</Text>
            <Text style={inlineStyle.label}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={inlineStyle.text}>394</Text>
            <Text style={inlineStyle.label}>Following</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.bioText}>{bioContent}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode={'contained'}
            color={'#00AAFF'}
            contentStyle={styles.editButtonContentStyles}
            style={styles.editButtonStyles}
            labelStyle={styles.editButtonLabelStyles}
            onPress={() => console.log('Follow Button Pressed')}>
            Follow
          </Button>
          <TouchableOpacity
            style={styles.menuButtonStyles}
            onPress={() => console.log('Menu Button Pressed')}>
            <MenuIcon size="24" color="#848c8e" />
          </TouchableOpacity>
        </View>

        <View style={styles.userCommunityContainer}>
          <Subheading style={styles.subheading}>My Communities</Subheading>
          <View style={styles.communityListContainer}>
            <Pressable style={styles.communityViewBox}></Pressable>
            <Pressable style={styles.communityViewBox}></Pressable>
          </View>
          <View style={styles.communityListContainer}>
            <Pressable style={styles.communityViewBox}></Pressable>
            <Pressable style={styles.communityViewBox}></Pressable>
          </View>
          <View style={styles.communityListContainer}>
            <Pressable style={styles.communityViewBox}></Pressable>
            <Pressable style={styles.communityViewBox}></Pressable>
          </View>
          <View style={styles.communityListContainer}>
            <Pressable style={styles.communityViewBox}></Pressable>
            <Pressable style={styles.communityViewBox}></Pressable>
          </View>
          <View style={styles.communityListContainer}>
            <Pressable style={styles.communityViewBox}></Pressable>
            <Pressable style={styles.communityViewBox}></Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
