import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';

import {useGridStyles} from '@src-styles';

const labelsAreaTranslation = 'home.inner';

function Home() {
  const {t} = useTranslation('privateRouter');
  const gridStyles = useGridStyles();

  return (
    <View style={gridStyles.body}>
      <Text style={styles.text}>
        {t(`${labelsAreaTranslation}.welcomeMessage`)}
      </Text>
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
