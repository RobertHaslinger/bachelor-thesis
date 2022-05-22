using Android.App;
using Android.Bluetooth;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Prism.Events;
using SampleXamarin.Models;
using SampleXamarin.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xamarin.Forms;

namespace SampleXamarin.Droid.Services
{
    public class BluetoothService_Android : BluetoothServiceBase
    {

        public BluetoothService_Android(IEventAggregator ea) : base(ea)
        {
            BluetoothAdapter.DefaultAdapter.Enable();
        }

        public override void GetPairedDevices()
        {
            if (BluetoothAdapter.DefaultAdapter != null && BluetoothAdapter.DefaultAdapter.IsEnabled)
            {
                foreach (var pairedDevice in BluetoothAdapter.DefaultAdapter.BondedDevices)
                {
                    DeviceModel device = new DeviceModel()
                    {
                        DeviceName = pairedDevice.Name,
                        BondState = pairedDevice.BondState.ToString()
                    };

                    NotifyDeviceFound(device);
                }
            }
        }

        public override void StartDiscovery()
        {
            
            BluetoothAdapter.DefaultAdapter.StartDiscovery();
        }
    }
}