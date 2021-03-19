import React, { useState } from "react";

import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
  const [imageData, setImageData] = useState("");

  const verifyPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    console.log(status);

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Please allow following permissions to continue",
        [{ text: "Okay" }]
      );

      return false;
    }
    return true;
  };

  const imagePickerHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    setImageData(image);

    if (!image.cancelled) {
      props.onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.imgContainer}>
      <View style={styles.imgPreview}>
        {!imageData.uri ? (
          <Text style={styles.text}> No image taken yet. Please take!</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imageData.uri }} />
        )}
      </View>
      <Button
        title="Capture"
        style={styles.imgButton}
        onPress={imagePickerHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  imgPreview: {
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
    minHeight: 200,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
  },
  imgButton: {},
});

export default ImgPicker;
