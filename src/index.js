import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Dashboard from './screens/Dashboard';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Dashboard />
    </SafeAreaView>
  );
};

export default App;
