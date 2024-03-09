import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text, CheckBox} from '@rneui/themed';
import TextInputMask from 'react-native-text-input-mask';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  useGridStyles,
  useTextInputStyles,
  useCheckInputStyles,
  useButtonStyles,
} from '@styles';

import {RootStackParamList} from '@app-types/navigation';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

function LoginPhone({navigation}: Props & any) {
  const {theme} = useTheme();
  const gridStyles = useGridStyles();
  const textInputStyles = useTextInputStyles();
  const checkInputStyles = useCheckInputStyles();
  const buttonStyles = useButtonStyles();
  const [phoneMasked, setPhoneMasked] = useState<string>();
  const [phone, setPhone] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  return (
    <SafeAreaView style={[gridStyles.body]}>
      <Text style={gridStyles.header}>Вход</Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[gridStyles.container]}>
        <View style={[gridStyles.content]}>
          <KeyboardAvoidingView enabled>
            <View style={[gridStyles.blockFlex]}>
              <Text style={[textInputStyles.label]}>
                Укажите номер телефона
              </Text>
              <TextInputMask
                style={[textInputStyles.input]}
                placeholder={'+7 (000) 000-00-00'}
                placeholderTextColor={theme.colors.grey1}
                autoCapitalize="none"
                keyboardType="phone-pad"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                mask={'+7 ([000]) [000]-[00]-[00]'}
                onChangeText={(masked, unmasked) => {
                  setPhoneMasked(masked);
                  setPhone(unmasked);
                }}
              />
            </View>
            <View style={[gridStyles.blockFlexRow, gridStyles.alignStart]}>
              <CheckBox
                checked={checked}
                onPress={toggleCheckbox}
                style={checkInputStyles.input}
                containerStyle={checkInputStyles.container}
                size={16}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor={theme.colors.primary}
              />
              <View>
                <Text style={checkInputStyles.label}>
                  При входе или регистрации, вы соглашаетесь
                </Text>
                <Text style={checkInputStyles.labelSecondary}>
                  с политикой конфиденциальности и условиями сервиса
                </Text>
              </View>
            </View>
            <View
              style={[
                gridStyles.blockFlex,
                gridStyles.alignEnd,
                {marginTop: theme.spacing.sm, paddingBottom: theme.spacing.sm},
              ]}>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonPrimary]}
                activeOpacity={0.5}
                onPress={() => {
                  if (phoneMasked && phone) {
                    AsyncStorage.multiSet([
                      ['loginType', 'phone'],
                      ['phoneMasked', phoneMasked],
                      ['phone', phone],
                    ]).then(() => {
                      navigation.replace('Code');
                    });
                  }
                }}>
                <Text style={[buttonStyles.label, buttonStyles.labelPrimary]}>
                  Продолжить
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginPhone;
