import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { searchManga } from '../../api/mangaSearch.api';
import { Link } from 'expo-router';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchManga(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search for Manga</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter manga title..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Manga</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {searchResults.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            {item.relationships
              .filter((relationship) => relationship.type === 'cover_art')
              .map((cover) => (
                <Link key={item.id} href={`/manga/${item.id}`}>
                  <Image
                    style={styles.mangaCover}
                    source={{
                      uri: `https://uploads.mangadex.org/covers/${item.id}/${cover.attributes.fileName}`,
                    }}
                  />
                </Link>
              ))}
            <Text style={styles.itemTitle}>{item.attributes.title.en}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#9381ff',
    padding: 9,
    borderRadius: 12,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    backgroundColor: '#f9f9f9',
    width: '45%',
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  mangaCover: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
});
