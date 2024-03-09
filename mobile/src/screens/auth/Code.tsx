import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text} from '@rneui/themed';
import TextInputMask from 'react-native-text-input-mask';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useGridStyles, useTextInputStyles, useButtonStyles} from '@styles';

import {RootStackParamList} from '@app-types/navigation';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

function Code({navigation}: Props & any) {
  const {theme} = useTheme();
  const gridStyles = useGridStyles();
  const textInputStyles = useTextInputStyles();
  const buttonStyles = useButtonStyles();
  const [key, setKey] = useState<string | null>();
  const [keyMasked, setKeyMasked] = useState<string | null>();
  const [code, setCode] = useState<string | undefined>();
  const [ready, setReady] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('loginType').then(value => {
      if (value !== null) {
        AsyncStorage.getItem(value).then(keyValue => {
          setKey(keyValue);
        });
        AsyncStorage.getItem(`${value}Show`).then(keyMaskedValue => {
          setKeyMasked(keyMaskedValue);
        });
      }
    });
  }, []);

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

  return (
    <SafeAreaView style={[gridStyles.body]}>
      <Text style={gridStyles.header}>Код подтверждения</Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[gridStyles.container]}>
        <View style={[gridStyles.content]}>
          <KeyboardAvoidingView enabled>
            <View style={[gridStyles.blockFlex]}>
              <Text style={[textInputStyles.label]}>
                Отправили на {keyMasked}
              </Text>
              <View style={[gridStyles.blockFlex, gridStyles.alignCenter]}>
                <TextInputMask
                  style={[textInputStyles.input]}
                  placeholder={'000-000'}
                  placeholderTextColor={theme.colors.grey1}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  underlineColorAndroid="#f000"
                  cursorColor={theme.colors.primary}
                  mask={'[000]-[000]'}
                  onChangeText={(masked, unmasked) => {
                    setCode(unmasked);
                    setReady(unmasked?.length === 6);
                  }}
                />
              </View>
            </View>
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
                    navigation.replace('Login');
                  }}>
                  <Text
                    style={[buttonStyles.label, buttonStyles.labelSecondary]}>
                    Вернуться
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
                  onPress={() => {
                    if (ready) {
                      AsyncStorage.setItem('code', code!).then(() => {
                        navigation.replace('PrivateRouter');
                      });
                    } else if (!disabled) {
                      setSeconds(60);
                      setDisabled(true);
                    }
                  }}>
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
                    {ready ? 'Продолжить' : disabled ? seconds : 'Повторить'}
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
