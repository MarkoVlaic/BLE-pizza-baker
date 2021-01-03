import { createContext, useContext } from 'react';

export const BleManagerContext = createContext(null);
export const BleManagerProvider = BleManagerContext.Provider;

export const useBleManager = () => {
  const bleManager = useContext(BleManagerContext);
  return bleManager;
};
