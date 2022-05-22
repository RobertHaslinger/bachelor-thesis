using Android.App;
using Android.Bluetooth;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Prism;
using Prism.Events;
using SampleXamarin.Events;
using SampleXamarin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SampleXamarin.Droid
{
    [BroadcastReceiver(Enabled = true)]
    [IntentFilter(new[] { BluetoothDevice.ActionFound })]
    public class BluetoothDeviceReceiver : BroadcastReceiver
    {

        public override void OnReceive(Context context, Intent intent)
        {
            var action = intent.Action;

            if (action != BluetoothDevice.ActionFound)
            {
                return;
            }

            // Get the device
            var device = (BluetoothDevice)intent.GetParcelableExtra(BluetoothDevice.ExtraDevice);

            if (device.BondState != Bond.Bonded)
            {
                DeviceModel newDevice = new DeviceModel()
                {
                    DeviceName = device.Name,
                    BondState = device.BondState.ToString()
                };

                var container = PrismApplicationBase.Current.Container;
                var ea = container.Resolve(typeof(IEventAggregator)) as IEventAggregator;

                ea.GetEvent<DeviceFoundEvent>().Publish(newDevice);
            }
        }
    }
}