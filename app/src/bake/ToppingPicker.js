/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Buffer } from 'buffer';

import Selectable from '../shared/Selectable';
import { bleManager, useBleManager } from '../bleManager';

import { PIZZA_SERVICE, TOPPINGS_CHARACTERISTIC } from '../uuids';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
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
  scroll: {
    height: 300,
    padding: 10,
  }
});

const toppings = ['pepperoni', 'mushrooms', 'extra cheese', 'black olives', 'canadian bacon', 'pineapple', 'bell peppers', 'sausage'];
const toppingPayload = {
  'pepperoni': 1, 
  'mushrooms': 1 << 1, 
  'extra cheese': 1 << 2,
  'black olives': 1 << 3, 
  'canadian bacon': 1 << 4, 
  'pineapple': 1 << 5, 
  'bell peppers': 1 << 6, 
  'sausage': 1 << 7,
};

const preparePayload = (selected) => {
  let payload = 0;

  for(let [topping, included] of Object.entries(selected)) {
    if(included) payload |= toppingPayload[topping];
  }

  return Buffer.from([ (payload & 0xFF00) >> 8, payload & 0xFF ]).toString('base64');
}

const ToppingPicker = () => {
  const bleManager = useBleManager();

  const defaultState = {};
  for (const topping of toppings) {
    defaultState[topping] = false;
  }

  const [selected, setSelected] = useState(defaultState);

  useEffect(() => {
    
    const write = async () => {
      const payload = preparePayload(selected);

      try {
        await bleManager.currentDevice.writeCharacteristicWithResponseForService(PIZZA_SERVICE, TOPPINGS_CHARACTERISTIC, payload);
      } catch (error) {
        console.error(error);
      }
    }

    write();

  }, [selected]);

  const selectables = toppings.map(
    (type, key) => (
      <Selectable
        value={type}
        active={selected[type]}
        onPress={() => setSelected((oldToppings) => {
          const newToppings = { ...oldToppings };
          newToppings[type] = !newToppings[type];
          return newToppings;
        })}
        key={key}
      />
    )
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Toppings</Text>
      <ScrollView nestedScrollEnabled style={styles.scroll} contentContainerStyle={styles.selectableContainer}>
        {selectables}
      </ScrollView>
    </View>
  );
};

export default ToppingPicker;
