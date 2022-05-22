using Prism.Events;
using SampleXamarin.Events;
using SampleXamarin.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SampleXamarin.Services
{
    public abstract class BluetoothServiceBase : IBluetoothService
    {
        private IEventAggregator _ea;

        public BluetoothServiceBase(IEventAggregator ea)
        {
            _ea = ea;
        }

        public abstract void GetPairedDevices();

        public void NotifyDeviceFound(DeviceModel device)
        {
            _ea.GetEvent<DeviceFoundEvent>().Publish(device);
        }

        public abstract void StartDiscovery();
    }
}
