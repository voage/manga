import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MangaView from '../../components/HomePageManga';
import { Link } from 'expo-router';
import { useUser } from '../../context/UserContext';

export default function Home() {
  const { user } = useUser();
  <Text style={styles.header}> {user && `Welcome ` + user.email}</Text>;

  return (
    <ScrollView style={styles.container}>
      <MangaView title="For you" endpoint={'includes[]=cover_art'} />
      <MangaView title="Newly Updated" endpoint={'includes[]=cover_art&order[updatedAt]=desc'} />
      <MangaView title="Top rated" endpoint={'includes[]=cover_art&order[rating]=desc'} />
      <MangaView
        title="Power Rankings"
        endpoint={'includes[]=cover_art&order[followedCount]=desc'}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
