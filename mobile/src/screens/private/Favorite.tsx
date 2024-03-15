import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TabNavigationParamList} from '@src-types/navigation';

type Props = NativeStackNavigationProp<TabNavigationParamList, 'Favorite'>;

function Favorite({navigation}: Props & any) {
  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainerStyle}>
        <View></View>
      </ScrollView>
    </View>
  );
}

export default Favorite;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
});
