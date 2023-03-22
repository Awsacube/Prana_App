/**
 * @format
 */
 import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {store} from './src/app/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Root = () => {
    return (  
      <SafeAreaProvider>
      <Provider store={store}>
      <App/>
      </Provider>
      </SafeAreaProvider>
    );
  };

AppRegistry.registerComponent(appName, () => Root);
