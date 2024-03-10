import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

type Props = NativeStackNavigationProp<RootStackParamList, 'Register'>;

function Register({navigation}: Props & any) {
  const {theme} = useTheme();
  const gridStyles = useGridStyles();
  const textInputStyles = useTextInputStyles();
  const buttonStyles = useButtonStyles();
  const selectDropdownStyles = useSelectDropdownStyles();

  return (
    <SafeAreaView style={gridStyles.body}>
      <Text style={gridStyles.header}>Регистрация</Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={gridStyles.container}>
        <View style={gridStyles.content}>
          <KeyboardAvoidingView enabled>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>Ваша фамилия</Text>
              <Input
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder="Введите фамилию"
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>Ваше имя</Text>
              <Input
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder="Введите имя"
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>Ваше отчество</Text>
              <Input
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder="Введите отчество"
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>Ваша электронная почта</Text>
              <Input
                style={textInputStyles.input}
                containerStyle={textInputStyles.container}
                inputContainerStyle={textInputStyles.container}
                cursorColor={theme.colors.primary}
                placeholder="Введите email"
                placeholderTextColor={theme.colors.grey2}
                errorStyle={textInputStyles.inputErrorMessageNone}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={gridStyles.blockFlex}>
              <Text style={textInputStyles.label}>Ваш пол</Text>
              <SelectDropdown
                data={['Мужской', 'Женский']}
                defaultValue={'Мужской'}
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
                  Зарегистрироваться
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
