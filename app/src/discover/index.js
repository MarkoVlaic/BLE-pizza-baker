import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import DeviceList from './DeviceList';
import Pizza from './Pizza.svg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pizza: {
    margin: 20,
    marginTop: '10%',
  },
  info: {
    fontSize: 25,
  },
});

const Discover = ({ setConnected }) => {
  const [info, setInfo] = useState('Find your baker!');

  return (
    <View style={styles.container}>
      <Pizza width={150} height={150} style={styles.pizza} />
      <Text style={styles.info}>{info}</Text>
      <DeviceList permissionDenied={() => setInfo('No bluetooth without permissions!')} setConnected={setConnected} setInfo={setInfo} />
    </View>
  );
};

export default Discover;
