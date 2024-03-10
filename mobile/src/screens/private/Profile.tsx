import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useThemeMode, useTheme, Avatar, AirbnbRating} from '@rneui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  useButtonStyles,
  useGridStyles,
  useAvatarStyles,
  useTextStyles,
} from '@styles';

import {TabNavigationParamList} from '@app-types/navigation';

const labelsAreaTranslation = 'profile.inner';

type Props = NativeStackNavigationProp<TabNavigationParamList, 'Profile'>;

function Profile({navigation}: Props & any) {
  const {i18n, t} = useTranslation('privateRouter');
  const {mode, setMode} = useThemeMode();
  const {theme} = useTheme();
  const gridStyles = useGridStyles();
  const buttonStyles = useButtonStyles();
  const avatarStyles = useAvatarStyles();
  const textStyles = useTextStyles();

  return (
    <SafeAreaView style={gridStyles.body}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={gridStyles.containerFluid}>
        <View style={gridStyles.content}>
          <View style={[gridStyles.blockFlexRow, gridStyles.justifyEnd]}>
            <KeyboardAvoidingView enabled>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}
                onPress={() => {
                  i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
                }}>
                <Text style={buttonStyles.label}>
                  {i18n.language === 'ru' ? 'RU' : 'EN'}
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView enabled>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}
                onPress={() => {
                  setMode(mode === 'dark' ? 'light' : 'dark');
                }}>
                <MaterialCommunityIcons
                  name={
                    mode === 'dark'
                      ? 'white-balance-sunny'
                      : 'moon-waxing-crescent'
                  }
                  size={25}
                  color={theme.colors.black}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView enabled>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}>
                <MaterialCommunityIcons
                  name="bell"
                  size={25}
                  color={theme.colors.black}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView enabled>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}>
                <MaterialCommunityIcons
                  name="menu"
                  size={25}
                  color={theme.colors.black}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView enabled>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonTransparent]}
                activeOpacity={0.5}
                onPress={() => {
                  AsyncStorage.clear().then(() => {
                    navigation.replace('Splash');
                  });
                }}>
                <MaterialCommunityIcons
                  name="logout"
                  size={25}
                  color={theme.colors.black}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          <View
            style={[
              gridStyles.blockFlexRow,
              gridStyles.justifyStart,
              gridStyles.alignCenter,
            ]}>
            <Avatar
              size={82}
              rounded
              title={t(`${labelsAreaTranslation}.avatar.label`)}
              containerStyle={[
                avatarStyles.container,
                {marginEnd: theme.spacing.sm},
              ]}
              titleStyle={avatarStyles.title}
            />
            <Avatar
              size={55}
              rounded
              title="+"
              containerStyle={avatarStyles.container}
              titleStyle={avatarStyles.title}
            />
          </View>
          <View style={[gridStyles.blockFlexRow, gridStyles.justifyStart]}>
            <Text style={[textStyles.base, textStyles.h2]}>
              {t(`${labelsAreaTranslation}.user.label`)}
            </Text>
          </View>
          <View style={[gridStyles.blockFlexRow, gridStyles.justifyStart]}>
            <Text style={[textStyles.base, textStyles.bold, textStyles.h3]}>
              4.3
            </Text>
            <AirbnbRating
              count={5}
              defaultRating={4}
              size={16}
              isDisabled
              showRating={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
