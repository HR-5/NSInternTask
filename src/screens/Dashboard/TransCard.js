import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as color from '../../utils/colors';

const TransCard = ({data}) => {
  const purpose = data.purpose;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name={
          purpose == 'Medical'
            ? 'medical-bag'
            : purpose == 'Investment'
            ? 'gold'
            : 'currency-inr'
        }
        color={
          purpose == 'Medical'
            ? '#1e63b9'
            : purpose == 'Investment'
            ? 'gold'
            : 'green'
        }
        size={30}
      />
      <View style={{flex: 1, marginLeft: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{data.purpose}</Text>
          <Text style={styles.title}>
            {'\u20B9'} {data.withdrawn}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'black'}}>{data.timestamp}</Text>
          <Text style={{color: color.Secondary, fontWeight: 'bold'}}>
            {data.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TransCard;
