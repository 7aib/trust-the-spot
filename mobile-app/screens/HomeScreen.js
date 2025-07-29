import { FlatList, View, StyleSheet } from 'react-native';
import ReelCard from '../components/ReelCard';

const dummyReels = [
  {
    id: '1',
    caption: 'Exploring northern Pakistan 🌄',
    thumbnail: 'https://source.unsplash.com/featured/?mountains,pakistan',
  },
  {
    id: '2',
    caption: 'Karachi street food vibes 🍢',
    thumbnail: 'https://source.unsplash.com/featured/?karachi,food',
  },
  {
    id: '3',
    caption: 'Camping under the stars ✨',
    thumbnail: 'https://source.unsplash.com/featured/?camping,stars',
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyReels}
        renderItem={({ item }) => <ReelCard reel={item} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default HomeScreen;
