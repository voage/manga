import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebaseConfig';
import { useNavigation } from 'expo-router';
import AppButton from '../../components/AppButton';
import InputField from '../../components/InputField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        Alert.alert('Error', 'Email and password are required');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        getAuth(firebaseApp),
        email.toLowerCase(),
        password
      );
      const user = userCredential.user;
      Alert.alert('Success', `Welcome back ${user.email}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to MangaStack</Text>
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <AppButton title="Login" onPress={handleLogin} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('signup')}>
            Sign Up
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
