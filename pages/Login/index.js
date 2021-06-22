import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../config/AuthProvider';

const Login = ({navigation}) => {
  // const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => navigation.replace('Home')}
          style={[styles.button, styles.login]}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.or}>Atau</Text>
        <TouchableOpacity style={[styles.button, styles.google]}>
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
