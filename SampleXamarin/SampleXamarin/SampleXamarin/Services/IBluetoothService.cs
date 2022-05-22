using SampleXamarin.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SampleXamarin.Services
{
    public interface IBluetoothService
    {
        void NotifyDeviceFound(DeviceModel device);
        void StartDiscovery();
        void GetPairedDevices();
    }
}
