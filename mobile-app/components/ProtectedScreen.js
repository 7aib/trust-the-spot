import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const ProtectedScreen = ({ children, fallbackComponent }) => {
  const { user } = useAuth();

  if (!user) {
    if (fallbackComponent) {
      return fallbackComponent;
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login Required</Text>
        <Text style={styles.message}>
          You need to be logged in to access this feature.
        </Text>
        <Text style={styles.hint}>
          Go to Profile tab to sign in
        </Text>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});

export default ProtectedScreen;
