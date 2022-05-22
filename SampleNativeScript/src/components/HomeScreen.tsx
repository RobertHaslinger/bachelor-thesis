import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { Dialogs } from '@nativescript/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { StyleSheet } from "react-nativescript";
import { MainStackParamList } from "./NavigationParamList";
import useBluetooth from "../hooks/useBluetooth";
import { useState } from "react";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
}

export function HomeScreen({ navigation }: HomeScreenProps) {
    const {startScan, getPaired} = useBluetooth();
    const [scannedDevices, setScannedDevices] = useState<string[]>([]);

    const startScanning = () => {
        startScan((result) => {
            if (
                result &&
                scannedDevices.find(d => d === result) === undefined
              ) {
                scannedDevices.push(result);
                alert(result);
              }
        });
    }

    return (
        <flexboxLayout style={styles.container}>
            <button
                onTap={startScanning}
            >
                Scan devices near me
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
    }
});