import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { launchImageLibrary } from "react-native-image-picker";

export default function UploadScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setPhoto(photo);
    }
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, (res) => {
      if (!res.didCancel && !res.errorCode) {
        setPhoto(res.assets[0]);
      }
    });
  };

  if (!device)
    return (
      <View style={styles.center}>
        <Text>Loading camera...</Text>
      </View>
    );
  if (!hasPermission)
    return (
      <View style={styles.center}>
        <Text>No camera permission</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {!photo ? (
        <>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />

          <TouchableOpacity style={styles.uploadTile} onPress={openGallery}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Upload</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={{ color: "#fff" }}>Capture</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: photo.path || photo.uri }}
            style={styles.preview}
          />
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={{ color: "#fff" }}>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  uploadTile: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 8,
  },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 50,
  },
  previewContainer: { flex: 1, backgroundColor: "#000" },
  preview: { flex: 1, resizeMode: "contain" },
  retakeButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 10,
    borderRadius: 8,
  },
});
