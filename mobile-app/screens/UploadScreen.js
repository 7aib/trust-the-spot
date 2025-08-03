import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function UploadScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      console.log("Camera:", Camera);
    })();
  }, []);

  // Capture a photo
  const takePhoto = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false, // Set to true if you need base64 for upload
        });
        Alert.alert("Success", "Photo captured! Uploading...");
        await uploadMedia(photo.uri, "photo");
      } catch (error) {
        Alert.alert("Error", "Failed to capture photo: " + error.message);
      }
    }
  };

  // Start/stop video recording
  const toggleRecording = async () => {
    if (cameraRef.current && isCameraReady) {
      if (isRecording) {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } else {
        try {
          const video = await cameraRef.current.recordAsync({
            quality: Camera.Constants.VideoQuality["720p"],
            maxDuration: 60, // Max 60 seconds
          });
          setIsRecording(true);
          Alert.alert("Success", "Video recorded! Uploading...");
          await uploadMedia(video.uri, "video");
        } catch (error) {
          Alert.alert("Error", "Failed to record video: " + error.message);
          setIsRecording(false);
        }
      }
    }
  };

  // Placeholder upload function (replace with your API)
  const uploadMedia = async (uri, type) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: `${type}_${Date.now()}.${type === "photo" ? "jpg" : "mp4"}`,
        type: type === "photo" ? "image/jpeg" : "video/mp4",
      });

      // Replace with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        Alert.alert("Success", `${type} uploaded successfully!`);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      Alert.alert("Error", `Failed to upload ${type}: ${error.message}`);
    }
  };

  // Flip camera
  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // Handle permission and loading states
  if (hasPermission === null) return <View />;
  if (hasPermission === false)
    return <Text style={styles.errorText}>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={styles.controls}>
        {/* Flip Camera Button */}
        <TouchableOpacity style={styles.controlButton} onPress={flipCamera}>
          <Ionicons name="camera-reverse" size={28} color="white" />
        </TouchableOpacity>

        {/* Capture Photo Button */}
        <TouchableOpacity
          style={[styles.controlButton, styles.captureButton]}
          onPress={takePhoto}
          disabled={!isCameraReady || isRecording}
        >
          <Ionicons
            name="camera"
            size={32}
            color={isCameraReady && !isRecording ? "white" : "gray"}
          />
        </TouchableOpacity>

        {/* Record Video Button */}
        <TouchableOpacity
          style={[
            styles.controlButton,
            styles.recordButton,
            isRecording && styles.recording,
          ]}
          onPress={toggleRecording}
          disabled={!isCameraReady}
        >
          <Ionicons
            name={isRecording ? "stop-circle" : "videocam"}
            size={32}
            color={isCameraReady ? "white" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  errorText: { flex: 1, textAlign: "center", marginTop: 50 },
  controls: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  controlButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderRadius: 30,
  },
  captureButton: {
    backgroundColor: "rgba(0,123,255,0.7)",
  },
  recordButton: {
    backgroundColor: "rgba(255,0,0,0.7)",
  },
  recording: {
    backgroundColor: "rgba(255,0,0,1)",
  },
});
