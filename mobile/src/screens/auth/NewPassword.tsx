import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {Input, useTheme} from '@rneui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector, authActions} from '@src-storage';

import {
  useButtonStyles,
  useGridStyles,
  useTextInputStyles,
  useTextStyles,
} from '@src-styles';

import {RootStackParamList} from '@src-types/navigation';
import {LOGIN_TYPE} from '@src-common/constants';

const labelsAreaTranslation = 'newPassword';

type Props = NativeStackNavigationProp<RootStackParamList, 'NewPassword'>;

type FormData = {
  password?: string;
};

function NewPassword({navigation}: Props & any) {
  const {t} = useTranslation('sharedRouter');
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.auth);
  const gridStyles = useGridStyles();
  const textStyles = useTextStyles();
  const textInputStyles = useTextInputStyles();
  const buttonStyles = useButtonStyles();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<FormData>({});

  const handleChangePassword = (value: string) => {
    setErrors({...errors, password: undefined});
    setPassword(value);
  };

  const validateForm = () => {
    let currentErrors: FormData = {};

    if (!password) {
      currentErrors.password = t(`${labelsAreaTranslation}.password.error`);
    }

    setErrors(currentErrors);
    if (Object.keys(currentErrors).length === 0) {
      submitForm();
    }
  };

  const submitForm = () => {
    dispatch(authActions.setLoginNewPassword(password!));
    dispatch(authActions.forgot()).then(result => {
      if (result.meta.requestStatus === 'fulfilled') {
        if (LOGIN_TYPE === 'email') {
          navigation.navigate('LoginEmailPassword');
        } else {
          navigation.navigate('LoginPhonePassword');
        }
      }
    });
  };

  return (
    <SafeAreaView style={gridStyles.body}>
      <Text style={gridStyles.header}>
        {t(`${labelsAreaTranslation}.title`)}
      </Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={gridStyles.container}>
        <View style={gridStyles.content}>
          <KeyboardAvoidingView enabled>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>
                {t(`${labelsAreaTranslation}.password.label`)}
              </Text>
              <Input
                style={[
                  textInputStyles.input,
                  errors.password ? textInputStyles.inputError : null,
                ]}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(`${labelsAreaTranslation}.password.placeholder`)}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={handleChangePassword}
              />
            </View>
            {error ? (
              <View style={[gridStyles.blockFlex, gridStyles.alignCenter]}>
                <Text style={[textStyles.base, textStyles.error]}>{error}</Text>
              </View>
            ) : null}
            <View
              style={[
                gridStyles.blockFlex,
                gridStyles.alignCenter,
                {marginTop: theme.spacing.lg, paddingBottom: theme.spacing.sm},
              ]}>
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

export default NewPassword;
