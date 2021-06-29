import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }

  console.log('Data berhasil di simpan');
};

export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }

  console.log('Data berhasil di ambil');
};

export const clearAll = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }

  console.log('Data berhasil di bersihkan');
};
