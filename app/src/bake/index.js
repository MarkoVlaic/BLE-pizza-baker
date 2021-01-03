import React, { useState } from 'react';

import { View, Text, ScrollView } from 'react-native';

import CrustPicker from './CrustPicker';
import ToppingPicker from './ToppingPicker';
import TemperaturePicker from './TemperaturePicker';
import ResultDisplay from './ResultDisplay';

const Bake = () => {
  const [baking, setBaking] = useState(false);
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <CrustPicker />
      <ToppingPicker />
      <TemperaturePicker baking={baking} setBaking={setBaking} />
      <ResultDisplay baking={baking} setBaking={setBaking} />
    </ScrollView>
  );
};

export default Bake;
