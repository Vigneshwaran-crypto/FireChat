/**
 * @format
 */

import {AppRegistry, View} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App/App';
import {Provider} from 'react-redux';
import store from './src/Redux/Store';
import {PaperProvider} from 'react-native-paper';

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
