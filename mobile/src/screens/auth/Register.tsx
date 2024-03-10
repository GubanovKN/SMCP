import React from 'react';
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

import {
  useButtonStyles,
  useGridStyles,
  useTextInputStyles,
  useSelectDropdownStyles,
} from '@styles';

import {RootStackParamList} from '@app-types/navigation';

const labelsAreaTranslation = 'register';

type Props = NativeStackNavigationProp<RootStackParamList, 'Register'>;

function Register({navigation}: Props & any) {
  const {t} = useTranslation('sharedRouter');
  const {theme} = useTheme();
  const gridStyles = useGridStyles();
  const textInputStyles = useTextInputStyles();
  const buttonStyles = useButtonStyles();
  const selectDropdownStyles = useSelectDropdownStyles();

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
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(`${labelsAreaTranslation}.lastname.placeholder`)}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>
                {t(`${labelsAreaTranslation}.name.label`)}
              </Text>
              <Input
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(`${labelsAreaTranslation}.name.placeholder`)}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>
                {t(`${labelsAreaTranslation}.middlename.label`)}
              </Text>
              <Input
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(
                  `${labelsAreaTranslation}.middlename.placeholder`,
                )}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>
                {t(`${labelsAreaTranslation}.email.label`)}
              </Text>
              <Input
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder={t(`${labelsAreaTranslation}.email.placeholder`)}
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
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
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
              />
            </View>
            <View
              style={[
                gridStyles.blockFlex,
                gridStyles.alignCenter,
                {marginTop: theme.spacing.lg, paddingBottom: theme.spacing.sm},
              ]}>
              <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.buttonPrimary]}
                activeOpacity={0.5}
                onPress={() => navigation.replace('PrivateRouter')}>
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
