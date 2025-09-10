import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import ReelCard from "../components/ReelCard";
import { API_ENDPOINTS } from "../URL_CONSTANTS";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReels();
  }, []);
  const fetchReels = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.LIVE_FEED);
      console.log("Response from backend:", response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched data:", data);

      // Format backend response for ReelCard
      const formatted = data.map((item) => ({
        id: item.id.toString(),
        caption: item.title || item.place_name || "Untitled Place", // fallback if title is null
        thumbnail: item.url || item.image_url || "https://via.placeholder.com/400x600", // fallback image
      }));

      setReels(formatted);
    } catch (error) {
      console.error("Error fetching reels:", error);
      // Set empty array on error to show "No reels available" message
      setReels([]);
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default HomeScreen;
