import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MangaScrollView from '../../components/HomePageManga';
import { Link } from 'expo-router';
import { useUser } from '../../context/UserContext';

export default function Home() {
  const [mangaFeed, setMangaFeed] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchMangaFeed() {
      try {
        const feed = await getMangaFeed();
        setMangaFeed(feed);
      } catch (error) {
        setError(error);
      }
    }
    fetchMangaFeed();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}> {user ? `Welcome ` + user.displayName : 'Welcome'}</Text>

      <MangaScrollView title="For you" offset={0} />
      <MangaScrollView title="Popular" offset={10} />
      <MangaScrollView title="Top Rated" offset={20} />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
