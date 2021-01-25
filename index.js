import { AppRegistry } from 'react-native';
import App from './src/Navigate';

AppRegistry.registerComponent('final_project_int493', () => App);

import { YellowBox } from 'react-native';
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is   ', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Remote debugger is in a background tab which may cause apps']);
YellowBox.ignoreWarnings(['Setting a timer']);
