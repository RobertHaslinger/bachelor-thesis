using Prism.Events;
using SampleXamarin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SampleXamarin.Events
{
    public class DeviceFoundEvent : PubSubEvent<DeviceModel>
    {
    }
}