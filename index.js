/**
 * @format
 */

import {AppRegistry, View} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App/App';

const ReduxApp = () => {
  return (
    <View style={{height: '100%', width: '100%', flex: 1}}>
      <App />
    </View>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
