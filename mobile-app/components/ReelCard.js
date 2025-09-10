import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { height } = Dimensions.get('window');

const ReelCard = ({ reel }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load image</Text>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.caption}>{reel.caption}</Text>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: reel.thumbnail }}
      style={styles.container}
      resizeMode="cover"
      onError={handleImageError}
    >
      <View style={styles.overlay}>
        <Text style={styles.caption}>{reel.caption}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    justifyContent: 'flex-end',
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  overlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  caption: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ReelCard;
