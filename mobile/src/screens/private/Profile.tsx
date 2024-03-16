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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  useAppSelector,
  useAppDispatch,
  authActions,
  settingsActions,
} from '@src-storage';

import {
  useButtonStyles,
  useGridStyles,
  useAvatarStyles,
  useTextStyles,
} from '@src-styles';

function Profile() {
  const {i18n} = useTranslation('privateRouter');
  const {mode} = useThemeMode();
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const {info} = useAppSelector(state => state.user);
  const gridStyles = useGridStyles();
  const buttonStyles = useButtonStyles();
  const avatarStyles = useAvatarStyles();
  const textStyles = useTextStyles();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

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
                  dispatch(
                    settingsActions.setLanguage(
                      i18n.language === 'ru' ? 'en' : 'ru',
                    ),
                  );
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
                  dispatch(
                    settingsActions.setTheme(
                      mode === 'dark' ? 'light' : 'dark',
                    ),
                  );
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
                onPress={handleLogout}>
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
              title={info?.firstName[0]}
              containerStyle={[
                avatarStyles.container,
                {marginEnd: theme.spacing.sm},
              ]}
              titleStyle={avatarStyles.title}
            />
          </View>
          <View style={[gridStyles.blockFlexRow, gridStyles.justifyStart]}>
            <Text style={[textStyles.base, textStyles.h2]}>
              {`${info?.firstName} ${info?.lastName}`}
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
