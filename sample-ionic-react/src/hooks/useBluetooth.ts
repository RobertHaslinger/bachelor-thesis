import {BluetoothSerial} from '@awesome-cordova-plugins/bluetooth-serial'

export default function useBluetooth() {
  const startScan = (callback: (result: string) => void) => {
    try {

      if (!BluetoothSerial.isEnabled) {
        BluetoothSerial.enable();
      }

      BluetoothSerial.setDeviceDiscoveredListener().subscribe({
        next: (result: any) => callback(result.name),
        error: (err: any) => console.error(err),
        complete: () => console.log("Scan completed")
      });
      BluetoothSerial.discoverUnpaired();
    } catch (err) {
      console.error(err);
    }
  }

  const getPaired = async () : Promise<any> => {
    try {

      return await BluetoothSerial.list().then(devices => {
        return devices.map((device: any) => device.name)
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  return { startScan, getPaired};
}