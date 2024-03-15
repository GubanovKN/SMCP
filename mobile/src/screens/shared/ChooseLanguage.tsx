import React from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Text} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppDispatch, settingsActions} from '@src-storage';

import {useGridStyles, useButtonStyles} from '@src-styles';

import {RootStackParamList} from '@src-types/navigation';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

function ChooseLanguage({navigation}: Props & any) {
  const dispatch = useAppDispatch();
  const gridStyles = useGridStyles();
  const buttonStyles = useButtonStyles();

  return (
    <SafeAreaView style={[gridStyles.body]}>
      <View style={[gridStyles.container, gridStyles.justifyCenter]}>
        <View style={[gridStyles.height50]}>
          <KeyboardAvoidingView enabled>
            <View style={[gridStyles.height50]}>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}
                onPress={() => {
                  dispatch(settingsActions.setLanguage('en'));
                  navigation.replace('Login');
                }}>
                <Text style={[buttonStyles.label]}>English</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView enabled>
            <View style={[gridStyles.height50]}>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}
                onPress={() => {
                  dispatch(settingsActions.setLanguage('ru'));
                  navigation.replace('Login');
                }}>
                <Text style={[buttonStyles.label]}>Русский</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ChooseLanguage;
