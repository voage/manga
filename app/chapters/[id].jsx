import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getMangaChapterImage } from '../../api/mangaChapters.api';

const MangaReader = () => {
  const { id } = useLocalSearchParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMangaChapterImage(id)
      .then((chapterImages) => {
        setImages(chapterImages);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.page} resizeMode="contain" />
      )}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});

export default MangaReader;
