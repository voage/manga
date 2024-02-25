import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
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
      {mangaFeed && mangaFeed.map((manga) => (
        <View key={manga.id} style={styles.mangaContainer}>
          <Text style={styles.title}>{manga.attributes.title.en}</Text>
          {manga.relationships.filter((mangaRelationship) => mangaRelationship.type === "cover_art").map((mangaCover) => (
            <Image
              key={mangaCover.id}
              style={{width: 100, height: 150}}
              source={{ uri: `https://uploads.mangadex.org/covers/${manga.id}/${mangaCover.attributes.fileName}` }}
            />
          ))}
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
