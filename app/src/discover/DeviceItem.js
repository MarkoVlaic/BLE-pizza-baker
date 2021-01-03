import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3CB371',
    padding: 20,
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

const DeviceItem = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{ name }</Text>
    </TouchableOpacity>
  );
};
export default DeviceItem;
