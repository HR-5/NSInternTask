import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import * as color from '../../utils/colors';

const BottomNav = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <EntypoIcon name="home" color="white" size={20} />
        <Text>Home</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="person" color={color.Accent} size={20} />
        <Text style={{color: color.Accent}}>Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.Primary,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNav;
