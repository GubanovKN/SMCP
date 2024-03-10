import React from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useGridStyles, useButtonStyles} from '@styles';

import {RootStackParamList} from '@app-types/navigation';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

function ChooseLanguage({navigation}: Props & any) {
  const {i18n} = useTranslation('sharedRouter');
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
                  i18n.changeLanguage('en');
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
                  i18n.changeLanguage('ru');
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
