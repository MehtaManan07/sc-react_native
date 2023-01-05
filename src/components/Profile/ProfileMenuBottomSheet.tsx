import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {List, Colors} from 'react-native-paper';

const ProfileMenuBottomSheet = ({sheetRef, figure}) => {
  const snapPoints = useMemo(() => [`${figure}3%`], []);
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const backdropComponent = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose
        backdropComponent={backdropComponent}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}>
        <List.Section>
          <List.Item
            left={() => (
              <List.Icon
                color={Colors.blue500}
                icon="bookmark"
                style={styles.image}
              />
            )}
            title="Create Community"
            description="Save the post for later reference"
            onPress={() => console.log('yahoo')}
          />
          <List.Item
            left={() => (
              <List.Icon
                color={Colors.blue500}
                icon="share"
                style={styles.image}
              />
            )}
            title="Share Profile"
            description="Share this profile with others"
          />
          <List.Item
            left={() => (
              <List.Icon
                color={Colors.red800}
                icon="flag"
                style={styles.image}
              />
            )}
            title="Report this Profile"
            description="Is the post offensive or"
          />
        </List.Section>
      </BottomSheet>
    </>
  );
};

export default ProfileMenuBottomSheet;

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
});
