import React from 'react';

import { StyleSheet, Text, Pressable } from 'react-native';

const styles = StyleSheet.create({
  default: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    maxWidth: 150,
    //backgroundColor: '#333',
    /*borderColor: '#246b44',
    backgroundColor: '#2a7d4f',*/
    backgroundColor: '#e7e7e7',
    borderColor: '#d7d7d7',
    borderRadius: 5,
    borderWidth: 1,
  },
  active: {
    /*backgroundColor: '#e7e7e7',
    borderColor: '#d7d7d7',*/
    borderColor: '#246b44',
    backgroundColor: '#2a7d4f',
    borderWidth: 1,
  },
  textDefault: {
    fontSize: 18,
    borderBottomWidth: 4,
    borderRadius: 5,
    borderBottomColor: '#3CB371',
    color: '#333',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 4,
  },
  textActive: {
    borderBottomColor: '#e7e7e7',
    color: '#fff',
  },
});

const Selectable = ({ active, value, onPress }) => {
  const selectableStyle = active ? { ...styles.default, ...styles.active } : styles.default;
  const textStyle = active ? { ...styles.textDefault, ...styles.textActive } : styles.textDefault;

  return (
    <Pressable onPress={onPress} style={selectableStyle}>
      <Text style={textStyle}>{ value }</Text>
    </Pressable>
  );
};

export default Selectable;
