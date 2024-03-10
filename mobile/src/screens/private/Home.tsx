import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Home() {
  return (
    <View style={styles.mainBody}>
      <Text style={styles.text}>Добро пожаловать</Text>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
