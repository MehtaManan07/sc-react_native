import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {
  CameraIcon,
  ImageIcon,
} from '../../screens/AuthScreens/PersonalInfoScreen/icons';
import ImagePicker from 'react-native-image-crop-picker';

const ImageModal = ({
  visible,
  setVisible,
  setUri,
  setLoading,
  setImageData,
}) => {
  const thenFunction = async image => {
    setLoading(true);
    setUri(image.path);
    let arr = image.path.split('/');
    const obj = {
      uri: image.path,
      name: image.path.split('/')[arr.length - 1],
      type: image.mime,
    };
    setImageData(obj);
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => thenFunction(image))
      .catch(err => console.log({err}))
      .finally(() => {
        setVisible(false);
        setLoading(false);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.4,
      compressImageMaxHeight: 300,
      compressImageMaxWidth: 300,
    })
      .then(image => thenFunction(image))
      .catch(err => console.log({err}))
      .finally(() => {
        setVisible(false);
        setLoading(false);
      });
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={styles.modalStyle}>
          <SafeAreaView style={styles.options}>
            <Pressable style={styles.btn} onPress={chooseImage}>
              <ImageIcon />
              <Text style={styles.buttonText}>Gallery</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={openCamera}>
              <CameraIcon />
              <Text style={styles.buttonText}>Camera</Text>
            </Pressable>
          </SafeAreaView>
        </Modal>
      </Portal>
    </>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
  options: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    height: 100,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle: {
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});
