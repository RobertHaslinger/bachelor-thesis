import { DeviceInfo } from '@awesome-cordova-plugins/bluetooth-le';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import useBluetooth from '../hooks/useBluetooth';
import './Home.css';

type Device = {
  /** signal strength */
  rssi: number;
  /**
   * advertisement data in encoded string of bytes, use bluetoothle.encodedStringToBytes() (Android)
   * advertisement hash with the keys (iOS)
   * empty (Windows)
   */
  advertisement: {
      /** An array of service UUIDs */
      serviceUuids: string[];
      /** A string representing the name of the manufacturer of the device */
      manufacturerData: string;
      /** A number containing the transmit power of a peripheral */
      txPowerLevel: number;
      /** An array of one or more CBUUID objects, representing CBService UUIDs that were found in the “overflow” area of the advertisement data */
      overflowServiceUuids: string[];
      /** A boolean value that indicates whether the advertising event type is connectable */
      isConnectable: boolean;
      /** An array of one or more CBUUID objects, representing CBService UUIDs */
      solicitedServiceUuids: string[];
      serviceData: any;
      localName: string;
  }
}

const Home: React.FC = () => {
  const { startScan, getPaired } = useBluetooth();
  const devices: string[] = [];
  const [pairedDevices, setPairedDevices] = useState<string[]>([]);

  useEffect(() => {
    getPaired().then(pairedDevices => {
      setPairedDevices(pairedDevices || []);
    })
  }, [])

  const startBluetoothScan =  () => {
    startScan((result) => {
      if (result && devices.find(d => d===result)===undefined) {
        devices.push(result);
        alert(result);
      }
    })
  }

  const renderPairedDevices = () => {
    return pairedDevices.map(device => <IonItem key={device}>{device}</IonItem>)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SampleIonicReact</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SampleIonicReact</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div id="container">
          <IonButton id="scan-btn" onClick={startBluetoothScan}>Scan Bluetooth Devices Near Me</IonButton>
          <IonList>
            {renderPairedDevices()}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
