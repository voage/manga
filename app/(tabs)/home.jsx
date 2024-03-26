import React from 'react';
import { ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MangaScrollView from '../../components/HomePageManga';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text>Welcome User</Text>

      <Link href="/signup">Sign Up?</Link>

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
    marginTop: 80,
  },
});
