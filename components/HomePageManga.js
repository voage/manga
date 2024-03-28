import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import React, { useState, useEffect } from 'react';
import { getManga } from '../api/mangaFeed.api';

const MangaView = ({ title, offset, endpoint }) => {
  const [theManga, setTheManga] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchManga() {
      try {
        const mangaList = await getManga(offset, endpoint);
        setTheManga(mangaList);
      } catch (error) {
        setError(error);
      }
    }
    fetchManga();
  }, []);

  const getTitleInAnyLanguage = (manga) => {
    for (const language in manga.attributes.title) {
      if (manga.attributes.title.hasOwnProperty(language)) {
        return manga.attributes.title[language];
      }
    }
    return 'Title Not Available';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.ScrollView}
        showsHorizontalScrollIndicator={false}
      >
        {theManga.map((manga) => (
          <View key={manga.id} style={styles.mangaItem}>
            {manga.relationships
              .filter((mangaRelationship) => mangaRelationship.type === 'cover_art')
              .map((mangaCover) => (
                <Link key={manga.id} href={`/manga/${manga.id}`} style={{}}>
                  <View>
                    <Image
                      style={styles.mangaCover}
                      key={mangaCover.id}
                      source={{
                        uri: `https://uploads.mangadex.org/covers/${manga.id}/${mangaCover.attributes.fileName}`,
                      }}
                    />
                  </View>
                </Link>
              ))}
            <Text style={styles.mangaTitle} ellipsizeMode="tail" numberOfLines={2}>
              {getTitleInAnyLanguage(manga)}
            </Text>
          </View>
        ))}
      </ScrollView>
      {error && <Text>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    paddingLeft: 10,
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  mangaItem: {
    marginRight: 15,
    width: 100,
    alignItems: 'center',
  },
  mangaTitle: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
  mangaCover: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default MangaView;
