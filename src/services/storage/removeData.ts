import AsyncStorage from '@react-native-async-storage/async-storage';

const removeData = async (key: StorageKeys) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    // remove error
  }
};

export default removeData;
