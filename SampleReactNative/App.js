/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  FlatList,
  View,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BleManager from 'react-native-ble-manager/BleManager';
import useBluetooth from './hooks/useBluetooth';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {startScan, getPairedDevices} = useBluetooth();
  const devices = [];
  const [pairedDevices, setPairedDevices] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    BleManager.start({showAlert: false, restoreIdentifierKey: 'sample'}).then(
      () => {
        // Success code
        console.log('Module initialized');
      },
    );
    BleManager.enableBluetooth()
      .then(() => {
        // Success code
        console.log('The bluetooth is already enabled or the user confirm');
      })
      .catch(error => {
        // Failure code
        console.log('The user refuse to enable bluetooth');
      });
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        if (
          peripheral.name &&
          devices.find(d => d === peripheral.name) === undefined
        ) {
          devices.push(peripheral.name);
          alert(peripheral.name);
        }
      },
    );
    bleManagerEmitter.addListener('BleManagerStopScan', () => {
      console.log('Stop scan');
    });

    getPairedDevices().then(devices => {
      setPairedDevices(devices);
    });
  }, []);

  const renderItem = ({item}) => <Item title={item} />;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button title="Scan devices near me" onPress={() => startScan()} />
      <FlatList
        data={pairedDevices}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
