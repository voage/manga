import Login from '../../components/Login';
import Signup from '../../components/Signup';
import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';
import { useUser } from '../../context/UserContext';

export default function Account() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { user, signOut } = useUser();

  if (!user) {
    return (
      <>
        {isLoginView ? <Login /> : <Signup />}

        <Text
          onPress={() => setIsLoginView((prevIsLoginView) => !prevIsLoginView)}
          style={{ textAlign: 'center', marginBottom: 30 }}
        >
          Already have an account? {isLoginView ? 'Sign Up' : 'Login'}
        </Text>
      </>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}
