import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { View, Text, Image, StyleSheet } from 'react-native';
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

        // Clean up function to unsubscribe from the snapshot listener when component unmounts
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
    <View style={styles.container}>
      {!user && <Text>Not logged in</Text>}
      {user && (
        <>
          <Text style={styles.title}>Favorites</Text>
          <View>
            {arrayThing(favoriteMangas, 3).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((manga) => (
                  <View key={manga.id} style={styles.item}>
                    <Text
                      style={{ width: 100, marginBottom: 0 }}
                      ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      {manga.title}
                    </Text>

                    <View>
                      <Image source={{ uri: manga.coverArt }} style={styles.coverArt} />
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    width: '30%',
  },
  coverArt: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});

export default Favorites;
