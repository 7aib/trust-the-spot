import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { activities } from '../data/activities';

const ActivityItem = ({ item }) => {
  let iconName;
  let iconColor;

  switch (item.type) {
    case 'like':
      iconName = 'heart';
      iconColor = 'red';
      break;
    case 'comment':
      iconName = 'chatbubble';
      iconColor = 'blue';
      break;
    case 'follow':
      iconName = 'person-add';
      iconColor = 'green';
      break;
    default:
      iconName = 'notifications';
      iconColor = 'gray';
  }

  return (
    <View style={styles.item}>
      <Icon name={iconName} size={24} color={iconColor} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>
          <Text style={styles.user}>{item.user}</Text> {item.content}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );
};

const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={({ item }) => <ActivityItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 3,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  user: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
});

export default ActivityScreen;
