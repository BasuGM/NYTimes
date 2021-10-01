import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {texts} from '../styles/textStyles';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);

  return (
    <View style={styles.DefaultScreen}>
      <Image
        source={require('../../assets/images/NY-Times.png')}
        style={{
          height: 300,
          width: 300,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  DefaultScreen: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e6e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
