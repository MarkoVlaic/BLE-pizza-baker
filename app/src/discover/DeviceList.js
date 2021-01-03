import React, { useEffect, useState } from 'react';

import { PermissionsAndroid, FlatList, Text, StyleSheet } from 'react-native';

import DeviceItem from './DeviceItem';

import { useBleManager } from '../bleManager';
import { PIZZA_SERVICE } from '../uuids';

const styles = StyleSheet.create({
  list: {
    borderWidth: 1,
    borderColor: '#e7e7e7',
    backgroundColor: '#e7e7e7',
    padding: 40,
    marginTop: 10,
  },
});

const DeviceList = ({ permissionDenied, setInfo, setConnected }) => {
  const bleManager = useBleManager();
  const [devices, setDevices] = useState([]);

  const requestPermissions = () => PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);

  useEffect(() => {
    const scan = async () => {
      const granted = await requestPermissions();

      if (!granted) {
        permissionDenied();
        return;
      }

      bleManager.startDeviceScan([PIZZA_SERVICE], { allowDuplicates: false }, (error, newDevice) => {
        if (error) {
          console.error(error);
          return;
        }

        const included = devices.find((device) => device.id === newDevice.id);
        if (!included) setDevices((oldDevices) => [...oldDevices, newDevice]);
      });
    };

    scan();
  });

  const renderItem = ({ item }) => {
    const onPress = async () => {
      setInfo('Connecting...');
      bleManager.stopDeviceScan();

      try {
        const device = await bleManager.connectToDevice(item.id);
        await device.discoverAllServicesAndCharacteristics();
        bleManager.currentDevice = device; // Attach the device to the current bleManager instance so we can use it elsewhere
        setInfo('Connected');
        setConnected(true);
      } catch (error) {
        setInfo('There was an error connecting to the baker: ' + error);
      }
    };

    return (
      <DeviceItem
        name={item.localName}
        onPress={onPress}
      />
    );
  };

  if(devices.length === 0) {
    return <Text>No bakers found nearby!</Text>
  }

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      style={styles.list}
    />
  );
};

export default DeviceList;
