import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import {setItem} from '../../config';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onsubmit = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        database()
          .ref(`user/${res.user.uid}/`)
          .once('value')
          .then(result => {
            if (result.val()) {
              setItem('user', result.val());
              navigation.replace('Home');
            }
          });
      })
      .catch(e => console.log(e));
  };

  const onGoogleSignIn = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth()
        .signInWithCredential(googleCredential)
        .then(res => {
          database()
            .ref(`user/${res.user.uid}/`)
            .once('value')
            .then(result => {
              if (result.val()) {
                setItem('user', result.val());
                navigation.replace('Home');
              }
            });
          console.log(res);
        })
        .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={val => setEmail(val)}
        />
        <TextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={val => setPassword(val)}
        />
        <TouchableOpacity
          onPress={onsubmit}
          style={[styles.button, styles.login]}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.or}>Atau</Text>
        <TouchableOpacity
          style={[styles.button, styles.google]}
          onPress={onGoogleSignIn}>
          <Text style={styles.textButton}>Masuk dengan Akun Google</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          textDecorationLine: 'underline',
          textAlign: 'center',
          fontSize: 20,
          color: '#0000ff',
          textDecorationColor: '#0000ff',
          marginTop: 30,
        }}
        onPress={() => navigation.navigate('SignUp')}>
        Create Account
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  or: {
    textAlign: 'center',
    paddingVertical: 15,
  },
  login: {
    backgroundColor: '#0000ff',
    marginTop: 10,
  },
  google: {
    backgroundColor: 'grey',
    marginTop: 10,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
  },
});
