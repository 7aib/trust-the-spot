import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import LoginScreen from './LoginScreen';    
const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const handlePress = () => {
    if (user) {
      logout();
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image
            source={{ uri: user.profilePic || 'https://i.pravatar.cc/150?img=1' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Button title="Logout" onPress={handlePress} />
        </>
      ) : (
        <>
          <Text style={styles.guest}>You are not logged in</Text>
          <Button title="Login" onPress={handlePress} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  guest: {
    fontSize: 18,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
});

export default ProfileScreen;
