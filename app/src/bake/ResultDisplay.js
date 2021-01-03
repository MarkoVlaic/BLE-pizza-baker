import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Buffer } from 'buffer';

import { useBleManager } from '../bleManager';
import { PIZZA_SERVICE, BAKE_CHARACTERISTIC } from '../uuids';

const bakeResult = {
  0: 'Half baked',
  1: 'Baked',
  2: 'Crispy',
  3: 'Burnt',
  4: 'On fire'
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 5,
    borderColor: '#3CB371',
    borderWidth: 2,
    borderRadius: 5,
  },
  heading: {
    fontSize: 25,
    color: '#333',
    textTransform: 'uppercase'
  },
  result: {
    fontSize: 30,
    textTransform: 'uppercase',
    color: '#3CB371',
    fontWeight: 'bold',
  }
});

const ResultDisplay = ({ baking, setBaking }) => {
  const [result, setResult] = useState(null);
  const bleManager = useBleManager();

  useEffect(() => {
    bleManager.currentDevice.monitorCharacteristicForService(
      PIZZA_SERVICE, BAKE_CHARACTERISTIC,
      (error, characteristic) => {
        if(error) return console.error(error);
        const payload = Buffer.from(characteristic.value, 'base64').readUInt8();
        setResult(payload);
        setBaking(false);
      }
    );
  });

  if(result === null) return <></>;
  if(baking) return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3CB371" />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your pizza came out</Text>
      <Text style={styles.result}>{bakeResult[result]}</Text>
    </View>
  );
};

export default ResultDisplay;