import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './components/BottomTabNavigator';
import { AuthProvider } from './contexts/AuthContext';


export default function App() {


  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </AuthProvider>

    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Login">
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     {/* Add more screens later */}
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
