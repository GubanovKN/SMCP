import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useTheme} from '@rneui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Loading from '@src-components/animated/Loading';

import {useAppSelector} from '@src-storage';

import {useGridStyles} from '@src-styles';

import {RootStackParamList} from '@src-types/navigation';

type Props = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

function Splash({navigation}: Props & any) {
  const {theme} = useTheme();
  const {authData} = useAppSelector(state => state.auth);
  const gridStyles = useGridStyles();

  useEffect(() => {
    setTimeout(() => {
      if (authData) {
        navigation.replace('PrivateRouter');
      } else {
        navigation.replace('ChooseLanguage');
      }
    }, 5000);
  }, [authData, navigation]);

  return (
    <View style={[gridStyles.body]}>
      <Loading color={theme.colors.primary} size={45} width={12} />
    </View>
  );
}

export default Splash;
