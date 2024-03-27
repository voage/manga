import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { getMangaFeed } from '../api/mangaFeed.api';

const MangaScrollView = ({ title, offset }) => {
  const [mangaFeed, setMangaFeed] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMangaFeed() {
      try {
        const feed = await getMangaFeed(offset);
        setMangaFeed(feed);
      } catch (error) {
        setError(error);
      }
    }
    fetchMangaFeed();
  }, [offset]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {mangaFeed.map((manga) => (
          <View key={manga.id} style={styles.mangaItem}>
            {manga.relationships
              .filter((mangaRelationship) => mangaRelationship.type === 'cover_art')
              .map((mangaCover) => (
                <Link key={manga.id} href={`/manga/${manga.id}`} style={{}}>
                  <Image
                    style={styles.mangaCover}
                    source={{
                      uri: `https://uploads.mangadex.org/covers/${manga.id}/${mangaCover.attributes.fileName}`,
                    }}
                  />
                </Link>
              ))}
            <Text style={styles.mangaTitle} ellipsizeMode="tail" numberOfLines={2}>
              {manga.attributes.title.en}
            </Text>
          </View>
        ))}
      </ScrollView>
      {error && <Text style={styles.error}>{error.message}</Text>}
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

export default MangaScrollView;
