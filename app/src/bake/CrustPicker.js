import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buffer } from 'buffer';

import Selectable from '../shared/Selectable';
import { useBleManager } from '../bleManager';

import { PIZZA_SERVICE, CRUST_CHARACTERISTIC } from '../uuids';

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
  selectables: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const crustTypes = ['Thick', 'Normal', 'Thin'];
const crustPayload = {
  'Normal': 0,
  'Thick': 1,
  'Thin': 2
}

const CrustPicker = () => {
  const [selected, setSelected] = useState(crustTypes[0]);
  const bleManager = useBleManager();

  useEffect(() => {
    const write = async () => {
      const payload = Buffer.from([crustPayload[selected]]).toString('base64');
      try {
        await bleManager.currentDevice.writeCharacteristicWithResponseForService(PIZZA_SERVICE, CRUST_CHARACTERISTIC, payload);
      } catch (error) {
        console.error(error);
      }
    };

    write();
  }, [selected]);

  const selectables = crustTypes.map(
    (type) => (
      <Selectable
        value={type}
        active={type === selected}
        onPress={() => setSelected(type)}
      />
    )
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Crust</Text>
      <View style={styles.selectables}>
        {selectables}
      </View>
    </View>
  );
};

export default CrustPicker;
