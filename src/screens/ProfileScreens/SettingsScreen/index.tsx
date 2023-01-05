import React, {useState} from 'react';
import {Linking, Text, View} from 'react-native';
import {ActivityIndicator, List} from 'react-native-paper';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SVGIcon} from './../../../components/SVGIcon';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {logoutUser} from '../../../store/Actions/AuthActions';
import {useDispatch} from 'react-redux';

export default function index() {
  const {navigate} = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const logoutPressHandler = () => {
    setLoading(true);
    setTimeout(async () => {
      // @ts-ignore
      await dispatch(logoutUser());
      // setLoading(false)
    }, 500);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listGroup}>
        <RNBounceable bounceEffect={0.97} onPress={() => {}}>
          <List.Item
            title="Privacy Policy"
            titleStyle={styles.titleStyle}
            style={styles.listItem}
            right={() => <List.Icon color="#000" icon="chevron-right" />}
            left={() => (
              <List.Icon
                color="#45E5A2"
                icon={props => (
                  // @ts-ignore
                  <SVGIcon {...props} height={70} type="privacy" width={70} />
                )}
              />
            )}
            onPress={() =>
              Linking.openURL(
                'https://getverse.notion.site/Privacy-Policy-Verse-bfb29b88c7f243d09a6d9ae19ed6915a',
              )
            }
          />
        </RNBounceable>
        <RNBounceable bounceEffect={0.97}>
          <List.Item
            title="Report Bug"
            titleStyle={styles.titleStyle}
            style={styles.listItem}
            right={() => <List.Icon color="#000" icon="chevron-right" />}
            left={() => (
              <List.Icon
                color="#71A1FF"
                icon={props => (
                  // @ts-ignore
                  <SVGIcon {...props} height={70} type="bug" width={70} />
                )}
              />
            )}
            onPress={() =>
              Linking.openURL('https://getverse.typeform.com/versebugs')
            }
          />
        </RNBounceable>
        {/* @ts-ignore */}
        <RNBounceable
          bounceEffect={0.97}
          onPress={() => navigate('SavedPosts')}>
          <List.Item
            title="Saved Posts"
            titleStyle={styles.titleStyle}
            style={styles.listItem}
            right={() => <List.Icon color="#000" icon="chevron-right" />}
            left={() => (
              <List.Icon
                color="#e85d04"
                icon={props => (
                  // @ts-ignore
                  <SVGIcon {...props} height={70} type="bookmark" width={70} />
                )}
              />
            )}
          />
        </RNBounceable>
        <RNBounceable bounceEffect={0.97}>
          <List.Item
            title="Join Support Community"
            titleStyle={styles.titleStyle}
            style={styles.listItem}
            right={() => <List.Icon color="#000" icon="chevron-right" />}
            left={() => (
              <List.Icon
                color="#bfd200"
                icon={props => (
                  // @ts-ignore
                  <SVGIcon {...props} height={70} type="social" width={70} />
                )}
              />
            )}
            onPress={() =>
              Linking.openURL('https://t.me/joinchat/UGJ0z9pAHE5lY2Nl')
            }
          />
        </RNBounceable>
        <RNBounceable bounceEffect={0.97} onPress={logoutPressHandler}>
          <List.Item
            title={!loading ? 'Logout' : 'Logging out'}
            titleStyle={styles.titleStyle}
            style={{...styles.listItem}}
            right={() => <List.Icon color="#000" icon="chevron-right" />}
            left={() => (
              <>
                {!loading ? (
                  <List.Icon
                    color="#FF5E5E"
                    icon={props => (
                      <SVGIcon
                        {...props}
                        fill={'transparent'}
                        height={70}
                        type="logout"
                        width={70}
                      />
                    )}
                  />
                ) : (
                  <ActivityIndicator size="small" />
                )}
              </>
            )}
          />
        </RNBounceable>
      </View>
      <View style={styles.footerText}>
        <Text style={styles.footerTextStyles}>1.1.0 (102121)</Text>
      </View>
    </SafeAreaView>
  );
}
