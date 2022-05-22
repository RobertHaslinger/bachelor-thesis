using Prism.Commands;
using Prism.Events;
using Prism.Mvvm;
using Prism.Navigation;
using Prism.Services;
using Prism.Services.Dialogs;
using SampleXamarin.Events;
using SampleXamarin.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

namespace SampleXamarin.ViewModels
{
    public class MainPageViewModel : ViewModelBase
    {
        private IBluetoothService _bluetoothService;
        private IPageDialogService _dialogService;

        public MainPageViewModel(INavigationService navigationService, IBluetoothService bluetoothService, IPageDialogService dialogService, IEventAggregator ea)
            : base(navigationService)
        {
            Title = "Main Page";
            _bluetoothService = bluetoothService;
            _dialogService = dialogService;

            ScanDevicesCommand = new DelegateCommand(OnScanDevices);

            ea.GetEvent<DeviceFoundEvent>().Subscribe(async (device) =>
            {
                if (device.BondState=="None")
                {
                    await _dialogService.DisplayAlertAsync("Device Found", $"Name: {device.DeviceName}, State: {device.BondState}", "OK");
                }
                else
                {
                    BondDevices.Add(device.DeviceName);
                }
            });

            _bluetoothService.GetPairedDevices();
        }

        public DelegateCommand ScanDevicesCommand { get; set; }
        public ObservableCollection<string> BondDevices { get; set; } = new ObservableCollection<string>();

        private void OnScanDevices()
        {
            _bluetoothService.StartDiscovery();
        }
    }
}
