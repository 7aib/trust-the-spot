import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { launchImageLibrary } from "react-native-image-picker";

export default function UploadScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cameraRef = useRef(null);

  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const cameraStatus = await Camera.requestCameraPermission();
      const microphoneStatus = await Camera.requestMicrophonePermission();
      
      if (cameraStatus === "granted" && microphoneStatus === "granted") {
        setHasPermission(true);
      } else {
        setError("Camera and microphone permissions are required");
        Alert.alert(
          "Permissions Required",
          "This app needs camera and microphone permissions to take photos and videos. Please enable them in your device settings.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Error requesting permissions:", error);
      setError("Failed to request permissions");
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Camera not ready");
      return;
    }

    try {
      setIsLoading(true);
      const photo = await cameraRef.current.takePhoto({
        quality: 0.8,
        skipMetadata: false,
      });
      setPhoto(photo);
    } catch (error) {
      console.error("Error taking picture:", error);
      Alert.alert("Error", "Failed to take picture. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openGallery = () => {
    const options = {
      mediaType: "photo",
      quality: 0.8,
      includeBase64: false,
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.errorCode) {
        console.error("Image picker error:", res.errorMessage);
        Alert.alert("Error", "Failed to open gallery. Please try again.");
      } else if (res.assets && res.assets.length > 0) {
        setPhoto(res.assets[0]);
      }
    });
  };

  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerText}>Loading camera...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={requestPermissions}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.centerText}>Camera permission required</Text>
        <TouchableOpacity style={styles.retryButton} onPress={requestPermissions}>
          <Text style={styles.retryButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

          <TouchableOpacity 
            style={[styles.captureButton, isLoading && styles.disabledButton]} 
            onPress={takePicture}
            disabled={isLoading}
          >
            <Text style={{ color: "#fff" }}>
              {isLoading ? "Capturing..." : "Capture"}
            </Text>
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
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  centerText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
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
  disabledButton: {
    opacity: 0.5,
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
