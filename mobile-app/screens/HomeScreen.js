import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import ReelCard from "../components/ReelCard";
import LIVE_FEED_URL from "../URL_CONSTANTS";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.8:8000")
      .then((res) => console.log("✅ Connected!", res.status))
      .catch((err) => console.log("❌ Failed", err));
    //fetchReels();
  }, []);
  const fetchReels = async () => {
    try {
      const response = await fetch(LIVE_FEED_URL);
      console.log("Response from backend:", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Format backend response for ReelCard
      const formatted = data.map((item) => ({
        id: item.id.toString(),
        caption: item.title || item.place_name, // fallback if title is null
        thumbnail: item.url, // this is actually a video url
      }));

      setReels(formatted);
    } catch (error) {
      console.error("Error fetching reels:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        renderItem={({ item }) => <ReelCard reel={item} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ color: "white" }}>No reels available</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
