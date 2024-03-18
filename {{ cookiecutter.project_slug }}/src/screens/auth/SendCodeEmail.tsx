import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme, Text, Input, CheckBox} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector, authActions} from '@src-storage';

import {
  useGridStyles,
  useTextInputStyles,
  useCheckInputStyles,
  useButtonStyles,
} from '@src-styles';

import {RootStackParamList} from '@src-types/navigation';

const labelsAreaTranslation = 'sendCode';

type Props = NativeStackNavigationProp<RootStackParamList, 'SendCode'>;

type FormData = {
  email?: string;
  checked?: string;
};

const re =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

function SendCodeEmail({navigation}: Props & any) {
  const {t} = useTranslation('sharedRouter');
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const {loginData} = useAppSelector(state => state.auth);
  const gridStyles = useGridStyles();
  const textInputStyles = useTextInputStyles();
  const checkInputStyles = useCheckInputStyles();
  const buttonStyles = useButtonStyles();
  const [email, setEmail] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<FormData>({});

  useEffect(() => {
    dispatch(authActions.setLoginPassword());
  }, [dispatch]);

  useEffect(() => {
    if (loginData.username) {
      setEmail(loginData.username);
    }
  }, [loginData, dispatch]);

  const changeEmail = (value: string) => {
    setErrors({...errors, email: undefined});
    setEmail(value);
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
    dispatch(authActions.setLoginPrivacyPolicy(checked));
    dispatch(
      authActions.sendCode({
        type: 'byemail',
      }),
    ).then(() => {
      navigation.navigate('Code');
    });
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
                placeholderTextColor={theme.colors.grey2}
                autoCapitalize="none"
                keyboardType="email-address"
                underlineColorAndroid="#f000"
                cursorColor={theme.colors.primary}
                onChangeText={changeEmail}
                value={email}
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
            <View
              style={[
                gridStyles.blockFlexRow,
                gridStyles.justifyBetween,
                {marginTop: theme.spacing.sm, paddingBottom: theme.spacing.sm},
              ]}>
              <View>
                <TouchableOpacity
                  style={[buttonStyles.button, buttonStyles.buttonSecondary]}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Text
                    style={[buttonStyles.label, buttonStyles.labelSecondary]}>
                    {t(`${labelsAreaTranslation}.back.label`)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={[buttonStyles.button, buttonStyles.buttonPrimary]}
                  activeOpacity={0.5}
                  onPress={validateForm}>
                  <Text style={[buttonStyles.label, buttonStyles.labelPrimary]}>
                    {t(`${labelsAreaTranslation}.continue.label`)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SendCodeEmail;
