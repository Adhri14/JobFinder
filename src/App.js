import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, AuthProvider} from './config/AuthProvider';
import Route from './Route';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Home} from './pages';

const App = () => {
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();
  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '207192437817-b24ps1j426f18d6en7msfue60rof9mn5.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    // <AuthProvider>
    <NavigationContainer>{!user ? <Route /> : <Home />}</NavigationContainer>
    // </AuthProvider>
  );
};

export default App;
