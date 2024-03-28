import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MangaView from '../../components/HomePageManga';
import { useUser } from '../../context/UserContext';

export default function Home() {
  const { user } = useUser();
  <Text style={styles.header}> {user && `Welcome ` + user.email}</Text>;

  return (
    <View style={styles.pageContainer}>
      <Image source={require('../../assets/dragonballheader.jpg')} style={styles.headerImage} />
      <View>
        <Text style={styles.header}> {user && `Welcome ` + user.email}</Text>
      </View>
      <ScrollView style={styles.container}>
        <MangaView title="For you" endpoint={'includes[]=cover_art'} />
        <MangaView title="Newly Updated" endpoint={'includes[]=cover_art&order[updatedAt]=desc'} />
        <MangaView title="Top rated" endpoint={'includes[]=cover_art&order[rating]=desc'} />
        <MangaView title="Popular" endpoint={'includes[]=cover_art&order[followedCount]=desc'} />

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerImage: {
    width: '100%',
    height: 150,
  },
});
