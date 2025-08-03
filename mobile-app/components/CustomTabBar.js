import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

const CustomTabBar = (props) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = {
          Home: 'home-outline',
          Map: 'map-outline',
          Upload: 'add-circle-outline',
          Activity: 'notifications-outline',
          Profile: 'person-outline',
        }[route.name];

        // Center Upload Button
        if (route.name === 'Upload') {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.uploadButton}
            >
              <Icon name="add" size={32} color="white" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? 'white' : 'gray'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 60,
    borderTopWidth: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 50,
    zIndex: 10,
    elevation: 5,
  },
});

export default CustomTabBar;
