/**
 * @format
 */
 import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {store} from './src/app/store'
import { Provider } from 'react-redux';

const Root = () => {
    return (  
      <Provider store={store}>
                  <App/>
      </Provider>
    );
  };


AppRegistry.registerComponent(appName, () => Root);
