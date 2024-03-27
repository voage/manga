import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';
import AppButton from './AppButton';
import InputField from './InputField';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    try {
      if (
        email.length === 0 ||
        password.length === 0 ||
        name.length === 0 ||
        username.length === 0
      ) {
        Alert.alert('Error', 'All fields are required');
        return;
      }

      const auth = getAuth(firebaseApp);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        username,
      });

      Alert.alert('Success', `Welcome ${name}! Your account has been created.`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up to MangaStack</Text>
      <InputField placeholder="Name" value={name} onChangeText={setName} />
      <InputField placeholder="Username" value={username} onChangeText={setUsername} />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  linkText: {
    color: '#4C5454',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
