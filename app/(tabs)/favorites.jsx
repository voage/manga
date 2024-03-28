import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useUser } from '../../context/UserContext';
import { Link } from 'expo-router';

const Favorites = () => {
  const [favoriteMangas, setFavoriteMangas] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      const db = getFirestore();
      const q = query(collection(db, 'users', user.uid, 'savedManga'));
      try {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const mangas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFavoriteMangas(mangas);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching saved mangas: ', error);
      }
    };

    fetchFavorites();
  }, [user]);

  const arrayThing = (arr, size) => {
    return arr.reduce((chunks, current, index) => {
      if (index % size === 0) {
        chunks.push([current]);
      } else {
        chunks[chunks.length - 1].push(current);
      }
      return chunks;
    }, []);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {!user && <Text style={styles.loginPrompt}>Please log in to view favorites</Text>}
        {user && (
          <>
            <Text style={styles.title}>Favorites</Text>
            <View>
              {arrayThing(favoriteMangas, 3).map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((manga) => (
                    <View key={manga.id} style={styles.item}>
                      <Image source={{ uri: manga.coverArt }} style={styles.coverArt} />
                      <Link key={manga.id} href={`/manga/${manga.mangaId}`} style={{}}>
                        <Text style={styles.mangaTitle} ellipsizeMode="tail" numberOfLines={2}>
                          {manga.title}
                        </Text>
                      </Link>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    width: '30%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
    padding: 10,
  },
  mangaTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  coverArt: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  loginPrompt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Favorites;
