import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../App';

type Props = NativeStackNavigationProp<RootStackParamList, 'Login'>;

function Login({navigation}: Props & any) {
  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Введите Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Введите пароль"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => navigation.replace('Home')}>
              <Text style={styles.buttonTextStyle}>Войти</Text>
            </TouchableOpacity>
            <View style={styles.additionActions}>
              <Text style={styles.registerTextStyle}>Регистрация</Text>
              <Text style={styles.registerTextStyle}>Забыли пароль?</Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 45,
    marginRight: 45,
    margin: 5,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  additionActions: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
  },
  registerTextStyle: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 5,
  },
});
