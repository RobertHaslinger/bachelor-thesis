import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sample-ionic-react',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.179.108:8100",
    cleartext: true
    }
};

export default config;
