import React from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image
            source={{ uri: user.profilePic || user.avatar || 'https://i.pravatar.cc/150?img=1' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.name || user.username || 'User'}</Text>
          <Text style={styles.email}>{user.email || ''}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text style={styles.guest}>You are not logged in</Text>
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
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
});

export default ProfileScreen;
