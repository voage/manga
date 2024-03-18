import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="sign-in" color={color} />,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Signup',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-plus" color={color} />,
        }}
      />
    </Tabs>
  );
}
