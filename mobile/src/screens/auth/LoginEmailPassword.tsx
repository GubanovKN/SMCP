import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme, Text, CheckBox, Input} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector, authActions} from '@src-storage';

import {
  useGridStyles,
  useTextInputStyles,
  useCheckInputStyles,
  useButtonStyles,
  useTextStyles,
} from '@src-styles';

import {RootStackParamList} from '@src-types/navigation';

const labelsAreaTranslation = 'loginEmailPassword';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type FormData = {
  email?: string;
  password?: string;
  checked?: string;
};

const re =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

function LoginEmailPassword({navigation}: Props & any) {
  const {t} = useTranslation('sharedRouter');
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const {loginData, authData, error} = useAppSelector(state => state.auth);
  const gridStyles = useGridStyles();
  const textStyles = useTextStyles();
  const textInputStyles = useTextInputStyles();
  const checkInputStyles = useCheckInputStyles();
  const buttonStyles = useButtonStyles();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<FormData>({});

  useEffect(() => {
    if (authData) {
      navigation.navigate('PrivateRouter');
    }
  }, [authData, navigation]);

  useEffect(() => {
    if (loginData.username) {
      setEmail(loginData.username);
    }
    setChecked(loginData.privacyPolicy);
  }, [loginData]);

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
      currentErrors.email = t(`${labelsAreaTranslation}.email.error`);
    }

    if (!password) {
      currentErrors.password = t(`${labelsAreaTranslation}.password.error`);
    }

    if (!checked) {
      currentErrors.checked = t(`${labelsAreaTranslation}.privacyPolicy.error`);
    }

    setErrors(currentErrors);
    if (Object.keys(currentErrors).length === 0) {
      submitForm();
    }
  };

  const submitForm = () => {
    dispatch(
      authActions.setLoginUsername({
        username: email!,
        usernameMasked: email!,
      }),
    );
    dispatch(authActions.setLoginPassword(password!));
    dispatch(authActions.setLoginPrivacyPolicy(checked));
    dispatch(authActions.login());
  };

  return (
    <SafeAreaView style={[gridStyles.body]}>
      <Text style={gridStyles.header}>
        {t(`${labelsAreaTranslation}.title`)}
      </Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[gridStyles.container]}>
        <View style={[gridStyles.content]}>
          <KeyboardAvoidingView enabled>
            <View style={[gridStyles.blockFlex]}>
              <Text style={[textInputStyles.label]}>
                {t(`${labelsAreaTranslation}.email.label`)}
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
                value={email}
              />
            </View>
            <View style={[gridStyles.blockFlex]}>
              <Text style={[textInputStyles.label]}>
                {t(`${labelsAreaTranslation}.password.label`)}
              </Text>
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
                  errors.checked ? theme.colors.error : theme.colors.grey2
                }
              />
              <View>
                <Text style={checkInputStyles.label}>
                  {t(`${labelsAreaTranslation}.privacyPolicy.label`)}
                </Text>
                <Text style={checkInputStyles.labelSecondary}>
                  {t(`${labelsAreaTranslation}.privacyPolicy.labelSecondary`)}
                </Text>
              </View>
            </View>
            {error ? (
              <View style={[gridStyles.blockFlex, gridStyles.alignCenter]}>
                <Text style={[textStyles.base, textStyles.error]}>{error}</Text>
              </View>
            ) : null}
            <View
              style={[
                gridStyles.blockFlexRow,
                gridStyles.justifyBetween,
                {marginTop: theme.spacing.sm, paddingBottom: theme.spacing.sm},
              ]}>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('SendCodeEmail')}>
                <Text style={[buttonStyles.label, textStyles.h6]}>
                  {t(`${labelsAreaTranslation}.forgot.label`)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonPrimary]}
                activeOpacity={0.5}
                onPress={validateForm}>
                <Text style={[buttonStyles.label, buttonStyles.labelPrimary]}>
                  {t(`${labelsAreaTranslation}.continue.label`)}
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
