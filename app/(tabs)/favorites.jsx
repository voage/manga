import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { View, Text } from 'react-native';
import { useUser } from '../../context/UserContext';

const favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser();

  useEffect(() => {}, []);

  if (!user) {
    // Here we can show a message like "Login to start saving" or some shit
    return <Text>Not logged in</Text>;
  }

  // Here user is logged in, so we show the saved mangas
  return (
    <View>
      <Text>Favorites</Text>
    </View>
  );
};
export default favorites;
