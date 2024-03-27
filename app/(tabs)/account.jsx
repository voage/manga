import React, { useState } from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { useUser } from '../../context/UserContext';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

export default function Account() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { user, signOut } = useUser();

  if (!user) {
    return (
      <View style={styles.container}>
        {isLoginView ? <Login /> : <Signup />}

        <Text onPress={() => setIsLoginView(!isLoginView)} style={styles.switchText}>
          {isLoginView ? "Don't have an account? " : 'Already have an account? '}
          <Text style={styles.boldText}>{isLoginView ? 'Sign Up' : 'Login'}</Text>
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Hello 👋🏻</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Name</Text>
          <Text style={styles.detailValue}>{user.displayName || 'N/A'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>Email</Text>
          <Text style={styles.detailValue}>{user.email}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>User ID</Text>
          <Text style={styles.detailValue}>{user.uid}</Text>
        </View>
        <Button title="Logout" onPress={signOut} color="#ff6347" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    padding: 20,
  },
  switchText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#2e2e2e',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    paddingLeft: 10,
  },
});
