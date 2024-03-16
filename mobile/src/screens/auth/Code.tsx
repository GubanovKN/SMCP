import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme, Text} from '@rneui/themed';
import TextInputMask from 'react-native-text-input-mask';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector, authActions} from '@src-storage';

import {
  useGridStyles,
  useTextStyles,
  useTextInputStyles,
  useButtonStyles,
} from '@src-styles';

import {RootStackParamList} from '@src-types/navigation';
import {USE_PASSWORD} from '@src-common/constants';

const labelsAreaTranslation = 'code';

type Props = NativeStackNavigationProp<RootStackParamList, 'Code'>;

function Code({navigation}: Props & any) {
  const {t} = useTranslation('sharedRouter');
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const {loginData, authData, error} = useAppSelector(state => state.auth);
  const gridStyles = useGridStyles();
  const textStyles = useTextStyles();
  const textInputStyles = useTextInputStyles();
  const buttonStyles = useButtonStyles();
  const [code, setCode] = useState<string | undefined>();
  const [ready, setReady] = useState(false);
  const [seconds, setSeconds] = useState(loginData.timeRepeat || 60);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!authData) {
      if (loginData.password) {
        if (loginData.exist) {
          if (USE_PASSWORD) {
            navigation.navigate('NewPassword');
          } else {
            dispatch(authActions.login());
          }
        } else {
          navigation.navigate('Register');
        }
      }
      if (loginData.timeRepeat) {
        setSeconds(loginData.timeRepeat);
      }
    } else {
      navigation.navigate('PrivateRouter');
    }
  }, [loginData, authData, dispatch, navigation]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (disabled) {
      timer = setInterval(() => {
        setSeconds(sec => {
          if (sec <= 1) {
            setDisabled(false);
            clearInterval(timer);
          }
          return sec - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [disabled]);

  const handleChangeCode = (masked: string, unmasked: string | undefined) => {
    dispatch(authActions.clearError());
    setCode(unmasked);
    setReady(!!unmasked);
  };

  const handleNext = () => {
    if (ready) {
      dispatch(authActions.setLoginCode(code!));
      dispatch(authActions.checkCode());
    } else if (!disabled) {
      dispatch(authActions.sendCode({type: 'byphone'}));
      setDisabled(true);
    }
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
                {t(`${labelsAreaTranslation}.code.label`, {
                  key: loginData.usernameMasked,
                })}
              </Text>
              <View style={[gridStyles.blockFlex, gridStyles.alignCenter]}>
                <TextInputMask
                  style={[
                    textInputStyles.input,
                    error ? textInputStyles.inputError : null,
                  ]}
                  placeholder={'000-000'}
                  placeholderTextColor={theme.colors.grey2}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  underlineColorAndroid="#f000"
                  cursorColor={theme.colors.primary}
                  mask={'[000]-[000]'}
                  onChangeText={handleChangeCode}
                />
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
                {
                  marginTop: theme.spacing.sm,
                  paddingBottom: theme.spacing.sm,
                },
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
                  style={[
                    buttonStyles.button,
                    ready
                      ? buttonStyles.buttonPrimary
                      : disabled
                      ? buttonStyles.buttonSecondary
                      : buttonStyles.buttonPrimaryOutline,
                  ]}
                  activeOpacity={0.5}
                  disabled={disabled && !ready}
                  onPress={handleNext}>
                  <Text
                    style={[
                      buttonStyles.label,
                      ready
                        ? buttonStyles.labelPrimary
                        : disabled
                        ? [
                            buttonStyles.labelSecondary,
                            gridStyles.marginHorizontalSm,
                            {minWidth: 55},
                          ]
                        : buttonStyles.labelPrimaryOutline,
                    ]}>
                    {ready
                      ? t(`${labelsAreaTranslation}.continue.label`)
                      : disabled
                      ? seconds
                      : t(`${labelsAreaTranslation}.repeat.label`)}
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

export default Code;
