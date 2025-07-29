import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { height } = Dimensions.get('window');

const ReelCard = ({ reel }) => {
  return (
    <ImageBackground
      source={{ uri: reel.thumbnail }}
      style={styles.container}
      resizeMode="cover"
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
