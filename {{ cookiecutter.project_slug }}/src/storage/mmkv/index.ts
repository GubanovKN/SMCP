import {MMKVLoader} from 'react-native-mmkv-storage';

export const privateStorage = new MMKVLoader()
  .withEncryption()
  .withInstanceID('privateData')
  .initialize();

export const sharedStorage = new MMKVLoader()
  .withInstanceID('sharedData')
  .initialize();
