import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getMangaFeed } from './api/mangaFeed.api';

export default function App() {
  const [mangaFeed, setMangaFeed] = useState([]);

  useEffect(() => {
    async function fetchMangaFeed() {
      const feed = await getMangaFeed();
      setMangaFeed(feed);
    }
    fetchMangaFeed();
  }, []);

  return (
    <View style={styles.container}>
      {mangaFeed &&
        mangaFeed.map((manga) => <Text key={manga.id}>{manga.attributes.title.en}</Text>)}

      <StatusBar style="auto" />
    </View>
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
