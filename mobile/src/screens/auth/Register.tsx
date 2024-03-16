import React, {useEffect, useState} from 'react';
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
import SelectDropdown from 'react-native-select-dropdown';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppDispatch, useAppSelector, authActions} from '@src-storage';

import {
  useButtonStyles,
  useGridStyles,
  useTextInputStyles,
  useSelectDropdownStyles,
  useTextStyles,
} from '@src-styles';

import {RootStackParamList} from '@src-types/navigation';
import {LOGIN_TYPE, USE_PASSWORD} from '@src-common/constants';

const labelsAreaTranslation = 'register';

type Props = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type FormData = {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  sex?: string;
  password?: string;
};

function Register({navigation}: Props & any) {
  const {t} = useTranslation('sharedRouter');
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const {loginData, authData, error} = useAppSelector(state => state.auth);
  const gridStyles = useGridStyles();
  const textStyles = useTextStyles();
  const textInputStyles = useTextInputStyles();
  const buttonStyles = useButtonStyles();
  const selectDropdownStyles = useSelectDropdownStyles();
  const [lastName, setLastName] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();
  const [sex, setSex] = useState<number>(0);
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<FormData>({});

  useEffect(() => {
    if (authData) {
      navigation.navigate('PrivateRouter');
    }
  }, [authData, navigation]);

  const handleChangeLastName = (value: string) => {
    setErrors({...errors, lastName: undefined});
    setLastName(value);
  };

  const handleChangeFirstName = (value: string) => {
    setErrors({...errors, firstName: undefined});
    setFirstName(value);
  };

  const handleChangeMiddleName = (value: string) => {
    setErrors({...errors, middleName: undefined});
    setMiddleName(value);
  };

  const handleChangePassword = (value: string) => {
    setErrors({...errors, password: undefined});
    setPassword(value);
  };

  const handleChangeSex = (label: string, value: number) => {
    setErrors({...errors, sex: undefined});
    setSex(value);
  };

  const validateForm = () => {
    let currentErrors: FormData = {};

    if (!lastName) {
      currentErrors.lastName = t(`${labelsAreaTranslation}.lastName.error`);
    }

    if (!firstName) {
      currentErrors.firstName = t(`${labelsAreaTranslation}.firstName.error`);
    }

    setErrors(currentErrors);
    if (Object.keys(currentErrors).length === 0) {
      submitForm();
    }
  };

  const submitForm = () => {
    if (LOGIN_TYPE === 'email') {
      dispatch(
        authActions.setRegisterData({
          type: 'email',
          lastName: lastName!,
          firstName: firstName!,
          middleName,
          sex,
          email: loginData.username,
          emailToken: loginData.password,
          password: password,
        }),
      );
    } else {
      dispatch(
        authActions.setRegisterData({
          type: 'phone',
          lastName: lastName!,
          firstName: firstName!,
          middleName,
          sex,
          phone: loginData.username,
          phoneToken: loginData.password,
          password: password,
        }),
      );
    }
    dispatch(authActions.register());
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
                {t(`${labelsAreaTranslation}.lastname.label`)}
              </Text>
              <Input
                style={[
                  textInputStyles.input,
                  errors.lastName ? textInputStyles.inputError : null,
                ]}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(`${labelsAreaTranslation}.lastname.placeholder`)}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="transparent"
                onChangeText={handleChangeLastName}
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>
                {t(`${labelsAreaTranslation}.name.label`)}
              </Text>
              <Input
                style={[
                  textInputStyles.input,
                  errors.firstName ? textInputStyles.inputError : null,
                ]}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(`${labelsAreaTranslation}.name.placeholder`)}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="transparent"
                onChangeText={handleChangeFirstName}
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>
                {t(`${labelsAreaTranslation}.middlename.label`)}
              </Text>
              <Input
                style={[
                  textInputStyles.input,
                  errors.middleName ? textInputStyles.inputError : null,
                ]}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(
                  `${labelsAreaTranslation}.middlename.placeholder`,
                )}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                underlineColorAndroid="transparent"
                onChangeText={handleChangeMiddleName}
              />
            </View>
            {USE_PASSWORD ? (
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
                  placeholder={t(
                    `${labelsAreaTranslation}.password.placeholder`,
                  )}
                  placeholderTextColor={theme.colors.grey2}
                  errorStyle={textInputStyles.inputErrorMessageNone}
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={handleChangePassword}
                />
              </View>
            ) : null}
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>
                {t(`${labelsAreaTranslation}.sex.label`)}
              </Text>
              <SelectDropdown
                data={[
                  t(`${labelsAreaTranslation}.sex.man`),
                  t(`${labelsAreaTranslation}.sex.woman`),
                ]}
                defaultValue={t(`${labelsAreaTranslation}.sex.man`)}
                dropdownIconPosition="right"
                buttonStyle={selectDropdownStyles.button}
                buttonTextStyle={selectDropdownStyles.text}
                dropdownStyle={selectDropdownStyles.dropdown}
                rowTextStyle={selectDropdownStyles.rowText}
                selectedRowStyle={selectDropdownStyles.selectedRow}
                selectedRowTextStyle={selectDropdownStyles.selectedRowText}
                renderDropdownIcon={isOpened => {
                  return (
                    <MaterialCommunityIcons
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={theme.colors.black}
                      size={24}
                    />
                  );
                }}
                onSelect={handleChangeSex}
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

export default Register;
