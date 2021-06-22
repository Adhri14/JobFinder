import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../config/AuthProvider';

const SignUp = ({navigation}) => {
  // const {register} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cnfPassword, setCnfPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.back}>Back</Text>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={useEmail => setEmail(useEmail)}
        />
        <TextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={usePassword => setPassword(usePassword)}
        />
        <TextInput
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry={true}
          style={styles.input}
          value={cnfPassword}
          onChangeText={useCnfPassword => setCnfPassword(useCnfPassword)}
        />
        <TouchableOpacity
          onPress={() => null}
          style={[styles.button, styles.login]}>
          <Text style={styles.textButton}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.or}>Atau</Text>
        <TouchableOpacity style={[styles.button, styles.google]}>
          <Text style={styles.textButton}>Masuk dengan Akun Google</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});
