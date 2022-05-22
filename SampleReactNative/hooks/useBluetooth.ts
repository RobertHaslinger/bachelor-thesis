import BleManager from 'react-native-ble-manager/BleManager';

export default function useBluetooth() {
  const startScan = () => {
    BleManager.scan([], 20, true).then(() => {
      console.log('Scan started');
    });
  };

  const getPairedDevices = () => {
    return BleManager.getBondedPeripherals().then(results => {
      return results.map(result => result.name);
    });
  };

  return {getPairedDevices, startScan};
}
