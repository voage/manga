import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MangaChapters = ({ chapters }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chapters</Text>
      {Object.keys(chapters).map((volume) => (
        <View key={volume} style={styles.volumeContainer}>
          <Text style={styles.volumeTitle}>Volume {volume}</Text>
          <View style={styles.chapterGrid}>
            {chapters[volume].map((chapter) => (
              <View key={chapter.id} style={styles.chapterCard}>
                <Text style={styles.chapterTitle}>
                  {chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`}
                </Text>
                <Text style={styles.chapterInfo}>
                  lang: {chapter.attributes.translatedLanguage}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  volumeContainer: {
    marginBottom: 20,
  },
  volumeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ddd',
    marginBottom: 10,
  },
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chapterCard: {
    width: '30%',
    borderRadius: 6,
    backgroundColor: '#2c2c2c',
    padding: 8,
    marginBottom: 10,
  },
  chapterTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  chapterInfo: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default MangaChapters;
