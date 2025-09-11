import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api';

const ProfileScreen = () => {
  const { user, logout, login } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post('auth/login/', {
        username: username.trim(),
        password,
      });

      const { token, user: userData } = response.data;
      await login(userData, token);
      
      // Reset form
      setUsername('');
      setPassword('');
      setIsLoginMode(false);
      
      Alert.alert('Login Successful', 'Welcome back!');
    } catch (error) {
      console.error('Login error:', error);
      const message =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.detail ||
        error.message ||
        'Login failed. Please check your credentials.';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  const showLoginForm = () => {
    setIsLoginMode(true);
  };

  const hideLoginForm = () => {
    setIsLoginMode(false);
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      {user ? (
        // Logged in state
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
        // Not logged in state
        <>
          {!isLoginMode ? (
            <>
              <View style={styles.guestContainer}>
                <Text style={styles.guestTitle}>Welcome to Trust the Spot</Text>
                <Text style={styles.guestMessage}>
                  Sign in to upload content and see your activity
                </Text>
                <Button title="Sign In" onPress={showLoginForm} />
              </View>
            </>
          ) : (
            // Login form
            <View style={styles.loginContainer}>
              <Text style={styles.loginTitle}>Sign In</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
                editable={!isLoading}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
              />
              
              <Button 
                title={isLoading ? "Signing in..." : "Sign In"} 
                onPress={handleLogin}
                disabled={isLoading}
              />
              
              {isLoading && (
                <ActivityIndicator 
                  size="small" 
                  color="#007AFF" 
                  style={styles.loader}
                />
              )}
              
              <Button 
                title="Cancel" 
                onPress={hideLoginForm}
                disabled={isLoading}
              />
            </View>
          )}
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
    padding: 20,
  },
  guestContainer: {
    alignItems: 'center',
    width: '100%',
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  guestMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  loginContainer: {
    width: '100%',
    maxWidth: 300,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  loader: {
    marginTop: 10,
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
