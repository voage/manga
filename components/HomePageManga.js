import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
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
    <View>
      <Text>{title}</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
        showsHorizontalScrollIndicator={false}
      >
        {mangaFeed.map((manga) => (
          <View key={manga.id} style={{ marginRight: 10 }}>
            <Text style={{ width: 100, marginBottom: 0 }} ellipsizeMode="tail" numberOfLines={2}>
              {manga.attributes.title.en}
            </Text>
            {manga.relationships
              .filter((mangaRelationship) => mangaRelationship.type === 'cover_art')
              .map((mangaCover) => (
                <Link key={manga.id} href={`/manga/${manga.id}`} style={{}}>
                  <View>
                    <Image
                      key={mangaCover.id}
                      style={{ width: 100, height: 150 }}
                      source={{
                        uri: `https://uploads.mangadex.org/covers/${manga.id}/${mangaCover.attributes.fileName}`,
                      }}
                    />
                  </View>
                </Link>
              ))}
          </View>
        ))}
      </ScrollView>
      {error && <Text>{error.message}</Text>}
    </View>
  );
};

export default MangaScrollView;
