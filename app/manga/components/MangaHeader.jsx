import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useUser } from '../../../context/UserContext';

const MangaHeader = ({ manga, stats }) => {
  const { attributes } = manga;
  const coverArt = manga.relationships.find((relationship) => relationship.type === 'cover_art');
  const tags = attributes.tags.map((tag) => tag.attributes.name.en);

  const { user } = useUser();
  const db = getFirestore();

  const handleSaveForLater = async () => {
    if (!user) {
      Alert.alert('You need to be logged in to save manga for later');
      return;
    }

    try {
      const res = await addDoc(collection(db, 'users', user.uid, 'savedManga'), {
        title: manga.attributes.title.en,
        mangaId: manga.id,
        coverArt: coverArt ? coverArt.attributes.fileName : '',
      });
      Alert.alert('Manga saved for later');
    } catch (error) {
      Alert.alert('Error saving manga for later', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {coverArt && (
        <>
          <Image
            style={styles.coverImage}
            resizeMode="cover"
            source={{
              uri: `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`,
            }}
            blurRadius={6}
          />
          <View style={styles.darkEffect} />
        </>
      )}

      <View style={styles.detailsContainer}>
        {coverArt && (
          <Image
            style={styles.thumbnailImage}
            source={{
              uri: `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`,
            }}
          />
        )}

        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.title]}>{manga.attributes.title.en}</Text>
          {manga.attributes.altTitles && (
            <Text style={styles.text}>{manga.attributes.altTitles[0]?.ja}</Text>
          )}
          <Text style={styles.text}>{manga.attributes.originalLanguage}</Text>

          <Text style={styles.text}>
            <Text style={styles.highlightText}>{stats && stats.rating.bayesian.toFixed(2)}</Text>/10
          </Text>
          <Text style={styles.text}>{stats && stats.follows} follows</Text>

          <View style={styles.tagsContainer}>
            {tags.map((t) => (
              <Text key={t} style={[styles.text, styles.tags]}>
                {t}
              </Text>
            ))}
          </View>

          <Text style={[styles.text, styles.status(manga.attributes.status)]}>
            {manga.attributes.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveForLater}>
        <Text style={styles.saveButtonText}>Save for Later</Text>
      </TouchableOpacity>

      <Text style={[styles.text, styles.description]}>{manga.attributes.description.en}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
  },
  coverImage: {
    width: 'auto',
    height: 180,
  },
  darkEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 180,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  detailsContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 5,
  },
  thumbnailImage: {
    width: 100,
    height: 180,
    borderRadius: 4,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 12,
    marginBottom: 5,
  },
  highlightText: {
    color: '#ff7a45',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tags: {
    fontSize: 10,
    backgroundColor: '#3d3d3d',
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 5,
    marginBottom: 5,
  },
  status: (status) => ({
    color: status === 'ongoing' ? '#ff7a45' : '#4caf50',
    textTransform: 'uppercase',
    fontSize: 9,
  }),
  description: {
    padding: 10,
    fontSize: 12.5,
  },
  saveButton: {
    marginHorizontal: 10,
    backgroundColor: '#ff7a45',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MangaHeader;
