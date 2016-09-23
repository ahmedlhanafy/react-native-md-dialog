/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import App from './App';

class DialogExample extends Component {
  render() {
    return (
      <App />
    );
  }
}


AppRegistry.registerComponent('DialogExample', () => DialogExample);
