import React, {useContext, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getItem, setItem} from '../../config';
import {launchImageLibrary} from 'react-native-image-picker';
import Avatar from '../../avatar.png';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(Avatar);
  const [photoURL, setPhotoURL] = useState(Avatar);

  const onsubmit = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const data = {
          photoURL: photoURL,
          displayName: name,
          email,
          uid: res.user.uid,
        };
        database().ref(`user/${res.user.uid}/`).set(data);
        setItem('user', data);
        navigation.replace('Home');
        console.log(data);
      })
      .catch(e => console.log(e.massage));
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
          const data = {
            photoURL: res.user.photoURL,
            displayName: res.user.displayName,
            email: res.user.email,
            uid: res.user.uid,
          };
          setItem('user', data);
          database().ref(`user/${res.user.uid}/`).set(data);
          navigation.replace('Home');
          console.log(res);
        })
        .catch(e => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const openLibrary = () => {
    launchImageLibrary(
      {maxWidth: 200, maxHeight: 200, includeBase64: true, quality: 0.4},
      res => {
        console.log(res);
        const pic = {uri: res.uri};
        const data = `data:${res.type};base64, ${res.base64}`;
        setPhotoURL(`data:${res.type};base64, ${res.base64}`);
        setImage(pic);
        console.log(data);
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={styles.back} onPress={() => navigation.goBack()}>
          Back
        </Text>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.form}>
          <TouchableOpacity onPress={openLibrary}>
            <View style={styles.circle}>
              <Image style={styles.image} source={image} />
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder="Name"
            keyboardType="default"
            style={styles.input}
            value={name}
            onChangeText={val => setName(val)}
          />
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
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.or}>Atau</Text>
          <TouchableOpacity
            style={[styles.button, styles.google]}
            onPress={onGoogleSignIn}>
            <Text style={styles.textButton}>Masuk dengan Akun Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  image: {
    width: 100,
    height: 100,
  },
});
