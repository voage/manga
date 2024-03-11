import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';
import { useNavigation } from 'expo-router';
import AppButton from '../../components/AppButton';
import InputField from '../../components/InputField';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        Alert.alert('Error', 'Email and password are required');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        getAuth(firebaseApp),
        email,
        password
      );
      const user = userCredential.user;
      Alert.alert('Success', `User ${user.email} has been created`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up to MangaStack</Text>
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton title="Sign Up" onPress={handleSignUp} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('login')}>
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
}

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
