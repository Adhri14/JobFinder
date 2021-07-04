import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {clearAll, getItem} from '../../config';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    getItem('user').then(res => {
      setName(res.displayName);
      setEmail(res.email);
      setPhotoURL(res.photoURL);
      // console.log(res.photoURL);
    });
  }, []);
  const onsubmit = () => {
    auth()
      .signOut()
      .then(() => {
        clearAll('user');
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      })
      .catch(e => console.log(e));
  };
  return (
    <View style={styles.container}>
      <Image
        source={{uri: `${photoURL}`}}
        // source={{uri: photoURL}}
        style={{width: 150, height: 150, borderRadius: 100, marginBottom: 10}}
      />
      <Text style={{marginBottom: 10, fontSize: 30, fontWeight: 'bold'}}>
        {!name ? '' : name}
      </Text>
      <Text
        style={{
          marginBottom: 30,
          fontSize: 18,
          fontWeight: '300',
          color: 'grey',
        }}>
        {email}
      </Text>
      <Text style={styles.text}>Home</Text>
      <Button title="Logout" onPress={onsubmit} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
