import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Buffer } from 'buffer';

import { useBleManager } from '../bleManager';
import { PIZZA_SERVICE, BAKE_CHARACTERISTIC } from '../uuids';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    alignItems: 'center'
  },
  heading: {
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#3CB371',
    textAlign: 'center',
    color: '#333',
    fontWeight: '900',
    marginBottom: 10,
  },
  slider: {
    width: 200,
    height: 40,
  },
  temperatureDisplay: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#3CB371',
    padding: 10,
    width: 200,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  }
});

const TemperaturePicker = ({ baking, setBaking }) => {
  const [temperature, setTemperature] = useState(0);
  const bleManager = useBleManager();

  const sendBake = async () => {
    setBaking(true);
    const arr = [(temperature & 0xFF00) >> 8, temperature & 0xFF];
    const payload = Buffer.from(arr).toString('base64');

    try {
      await bleManager.currentDevice.writeCharacteristicWithResponseForService(PIZZA_SERVICE, BAKE_CHARACTERISTIC, payload);
    } catch (error) {
      console.error(error);
    }
  }

  const btnContent = baking ? (<ActivityIndicator size="small" color="#fff"/>) : (<Text style={styles.buttonText}>Bake!</Text>);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Temperature</Text>
      <Text style={styles.temperatureDisplay}>{`${temperature} °F`}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={500}
        step={1}
        minimumTrackTintColor="#3CB371"
        maximumTrackTintColor="#333"
        onValueChange={(temp) => setTemperature(temp)}
      />

      <TouchableOpacity style={styles.button} onPress={sendBake} disabled={baking} >
        {btnContent}
      </TouchableOpacity>

    </View>
  );
};

export default TemperaturePicker;
