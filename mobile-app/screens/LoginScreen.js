import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../api';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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

      const { token, user } = response.data;

      // Use the auth context to handle login
      await login(user, token);

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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Trust the Spot</Text>
      <Text style={styles.subheading}>Sign in to continue</Text>
      
      <View style={styles.form}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subheading: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
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
});
