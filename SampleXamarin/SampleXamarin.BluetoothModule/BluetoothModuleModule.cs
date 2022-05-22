using Prism.Ioc;
using Prism.Modularity;
using SampleXamarin.BluetoothModule.ViewModels;
using SampleXamarin.BluetoothModule.Views;

namespace SampleXamarin.BluetoothModule
{
    public class BluetoothModuleModule : IModule
    {
        public void OnInitialized(IContainerProvider containerProvider)
        {

        }

        public void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterForNavigation<ViewA, ViewAViewModel>();
        }
    }
}
