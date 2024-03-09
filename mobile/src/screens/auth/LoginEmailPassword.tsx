import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text, CheckBox, Input} from '@rneui/themed';
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
  email?: string;
  password?: string;
  checked?: string;
};

const re =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

function LoginEmailPassword({navigation}: Props & any) {
  const {theme} = useTheme();
  const gridStyles = useGridStyles();
  const textInputStyles = useTextInputStyles();
  const checkInputStyles = useCheckInputStyles();
  const buttonStyles = useButtonStyles();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<FormData>({});

  const changeEmail = (value: string) => {
    setErrors({...errors, email: undefined});
    setEmail(value);
  };

  const changePassword = (value: string) => {
    setErrors({...errors, password: undefined});
    setPassword(value);
  };

  const toggleCheckbox = () => {
    setErrors({...errors, checked: undefined});
    setChecked(!checked);
  };

  const validateForm = () => {
    let currentErrors: FormData = {};

    if (!email || !re.test(email)) {
      currentErrors.email = 'Укажите электронную почту';
    }

    if (!password) {
      currentErrors.password = 'Укажите пароль';
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
      ['loginType', 'email'],
      ['loginConfirm', 'password'],
      ['emailShow', email!],
      ['email', email!],
      ['password', password!],
    ]).then(() => {
      navigation.replace('PrivateRouter');
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
                Укажите электронную почту
              </Text>
              <Input
                style={[
                  textInputStyles.input,
                  errors.email ? textInputStyles.inputError : null,
                ]}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                errorStyle={textInputStyles.inputErrorMessageNone}
                textContentType="emailAddress"
                autoCapitalize="none"
                keyboardType="email-address"
                underlineColorAndroid="#f000"
                cursorColor={theme.colors.primary}
                onChangeText={changeEmail}
              />
            </View>
            <View style={[gridStyles.blockFlex]}>
              <Text style={[textInputStyles.label]}>Укажите пароль</Text>
              <Input
                style={[
                  textInputStyles.input,
                  errors.password ? textInputStyles.inputError : null,
                ]}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                errorStyle={textInputStyles.inputErrorMessageNone}
                textContentType="password"
                autoCapitalize="none"
                keyboardType="default"
                underlineColorAndroid="#f000"
                cursorColor={theme.colors.primary}
                secureTextEntry={true}
                onChangeText={changePassword}
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
                  errors.checked ? theme.colors.error : theme.colors.grey1
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

export default LoginEmailPassword;
