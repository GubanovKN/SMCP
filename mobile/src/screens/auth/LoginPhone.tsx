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

type FormData = {
  phone?: string;
  checked?: string;
};

function LoginPhone({navigation}: Props & any) {
  const {theme} = useTheme();
  const gridStyles = useGridStyles();
  const textInputStyles = useTextInputStyles();
  const checkInputStyles = useCheckInputStyles();
  const buttonStyles = useButtonStyles();
  const [phoneMasked, setPhoneMasked] = useState<string>();
  const [phone, setPhone] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<FormData>({});

  const changePhone = (masked: string, unmasked: string | undefined) => {
    setErrors({...errors, phone: undefined});
    setPhoneMasked(masked);
    setPhone(`7${unmasked}`);
  };

  const toggleCheckbox = () => {
    setErrors({...errors, checked: undefined});
    setChecked(!checked);
  };

  const validateForm = () => {
    let currentErrors: FormData = {};

    if (!phone || phone.length !== 11) {
      currentErrors.phone = 'Укажите номер телефона';
    }

    if (!checked) {
      currentErrors.checked = 'Подтвердите согласие';
    }

    setErrors(currentErrors);
    if (Object.keys(currentErrors).length === 0) {
      submitForm();
    }
  };

  const submitForm = () => {
    AsyncStorage.multiSet([
      ['loginType', 'phone'],
      ['loginConfirm', 'token'],
      ['phoneShow', phoneMasked!],
      ['phone', phone!],
    ]).then(() => {
      navigation.replace('Code');
    });
  };

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
                style={[
                  textInputStyles.input,
                  errors.phone ? textInputStyles.inputError : null,
                ]}
                placeholder={'+7 (000) 000-00-00'}
                placeholderTextColor={theme.colors.grey2}
                autoCapitalize="none"
                keyboardType="phone-pad"
                underlineColorAndroid="#f000"
                cursorColor={theme.colors.primary}
                mask={'+7 ([000]) [000]-[00]-[00]'}
                onChangeText={changePhone}
              />
            </View>
            <View style={[gridStyles.blockFlexRow, gridStyles.alignStart]}>
              <CheckBox
                checked={checked}
                onPress={toggleCheckbox}
                style={[checkInputStyles.input]}
                containerStyle={checkInputStyles.container}
                size={16}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor={theme.colors.primary}
                uncheckedColor={
                  errors.checked ? theme.colors.error : theme.colors.grey2
                }
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
                onPress={validateForm}>
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
