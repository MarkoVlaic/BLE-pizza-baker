import React, { useState, useEffect } from 'react';

import { BleManager } from 'react-native-ble-plx';
import { BleManagerProvider } from './bleManager';

import Discover from './discover';
import Bake from './bake';

const bleManager = new BleManager();

const App = () => {
  useEffect(() => {
    return () => {
      if(bleManager.currentDevice) bleManager.currentDevice.cancelConnection();
    }
  }, []);


  const [connected, setConnected] = useState(false);

  const currentScreen = connected ? <Bake /> : <Discover setConnected={setConnected} />;

  return (
    <BleManagerProvider value={bleManager}>
      { currentScreen }
    </BleManagerProvider>
  );
};

export default App;
