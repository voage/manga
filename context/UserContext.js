import React, { createContext, useState, useContext } from 'react';
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signOut = async () => {
    try {
      await firebaseSignOut(getAuth(firebaseApp));
      setUser(null);
    } catch (error) {
      console.error('Logout error: ', error);
    }
  };

  return <UserContext.Provider value={{ user, setUser, signOut }}>{children}</UserContext.Provider>;
};
