import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from '@rneui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '@custom-components/animated/Loading';

import {useGridStyles} from '@styles';

import {RootStackParamList} from '@app-types/navigation';

type Props = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

function Splash({navigation}: Props & any) {
  const {theme} = useTheme();
  const gridStyles = useGridStyles();

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('name').then(value => {
        value
          ? navigation.replace('PrivateRouter')
          : navigation.replace('ChooseLanguage');
      });
    }, 5000);
  }, [navigation]);

  return (
    <View style={[gridStyles.body]}>
      <Loading color={theme.colors.primary} size={45} width={12} />
    </View>
  );
}

export default Splash;
