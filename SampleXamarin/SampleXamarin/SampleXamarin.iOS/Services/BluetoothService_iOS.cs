using Foundation;
using Prism.Events;
using SampleXamarin.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UIKit;

namespace SampleXamarin.iOS.Services
{
    public class BluetoothService_iOS : BluetoothServiceBase
    {
        public BluetoothService_iOS(IEventAggregator ea) : base(ea)
        {
        }

        public override void GetPairedDevices()
        {
            throw new NotImplementedException();
        }

        public override void StartDiscovery()
        {
            throw new NotImplementedException();
        }
    }
}