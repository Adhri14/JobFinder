import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, AuthProvider} from './config/AuthProvider';
import Route from './Route';

const App = () => {
  // const {user, setUser} = useContext(AuthContext);
  // const [initialize, setInitialize] = useState(true);

  // const onAuthStateChanged = user => {
  //   setUser(user);
  //   if (initialize) {
  //     setInitialize(false);
  //   }
  // };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  // if (initialize) {
  //   return null;
  // }

  return (
    // <AuthProvider>
    <NavigationContainer>
      {/* {user && <Route />} */}
      <Route />
    </NavigationContainer>
    // </AuthProvider>
  );
};

export default App;
