import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TextInput, Button, Modal} from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import * as color from '../../utils/colors';
const sliderLength = Dimensions.get('screen').width - 40;

const TopLayout = ({name, earn, withdraw, purpose, modal, update, refresh}) => {
  const [amount, setAmount] = useState('\u20B9' + '0');
  const [sliderOneValue, setSliderOneValue] = useState([0]);
  const [err, setErr] = useState(false);
  const [disable, setDisable] = useState(true);
  const [p, setP] = useState(true);

  const sliderOneValuesChange = values => {
    setSliderOneValue(values);
    var val = '\u20B9' + values[0];
    setDisable(true);
    if (values[0] >= 500) {
      setDisable(false);
    }
    setAmount(val);
    setErr(false);
  };

  useEffect(() => {
    if (refresh) {
      setAmount('\u20B9' + '0');
      setSliderOneValue([0]);
    }
  }, [refresh]);

  const withdrawApi = () => {
    if (purpose == 'Select Purpose') {
      setP(false);
      return;
    }
    var now = new Date().toString().split(' ');
    var date = now[2] + ' ' + now[1] + ',' + now[3] + ' ' + now[4];
    setP(true);
    var balance = withdraw - parseInt(amount.substring(1));
    const trans = {
      purpose: purpose,
      withdrawn: amount.substring(1),
      status: 'Success',
      timestamp: date,
    };
    update(trans, balance);
  };

  const fixAmt = per => {
    var amt = Math.floor((withdraw * per) / 100);
    var val = '\u20B9' + amt;
    setAmount(val);
    setErr(false);
    setDisable(true);
    if (amt >= 500) {
      setDisable(false);
    }
    setSliderOneValue([amt]);
  };

  return (
    <View>
      <View style={styles.topcontainer}>
        <Image source={require('../../assests/images/textonly128.png')} />
        <Text style={styles.name}>Hi, {name}</Text>
        <View style={styles.salaryContainer}>
          <View style={styles.textBox}>
            <Text style={styles.title}>You have earned</Text>
            <Text style={styles.salaryText}>
              {'\u20B9'}
              {earn}
            </Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.title}>You can withdraw</Text>
            <Text style={styles.salaryText}>
              {'\u20B9'}
              {withdraw}
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <TouchableOpacity
          style={{...styles.purposeContainer, borderColor: p ? 'black' : 'red'}}
          onPress={() => {
            modal();
          }}>
          <Text style={styles.purpose}>{purpose}</Text>
        </TouchableOpacity>
        <TextInput
          mode="outlined"
          theme={{
            colors: {
              primary: 'black',
            },
          }}
          label={'Enter Amount (' + '\u20B9' + ')'}
          outlineColor="black"
          keyboardType="phone-pad"
          style={{backgroundColor: 'white', marginTop: 5}}
          value={amount}
          error={err}
          onChangeText={amt => {
            setDisable(true);
            if (amt[0] != '\u20B9') amt = '\u20B9' + amt;
            if (amt.length <= 1) {
              setAmount('\u20B9');
              return;
            }
            var pay = amt.substring(1);
            var val = [];
            val[0] = Math.floor(parseInt(pay));
            setAmount('\u20B9' + val[0]);
            if (val[0] === NaN || val[0] > withdraw) {
              setErr(true);
              return;
            }
            if (val[0] >= 500) {
              setDisable(false);
            }
            setErr(false);
            setSliderOneValue(val);
          }}
          returnKeyType="done"
          returnKeyLabel="done"
        />
        <View style={{alignItems: 'center'}}>
          <MultiSlider
            selectedStyle={{backgroundColor: color.Primary}}
            markerStyle={{backgroundColor: color.Primary}}
            values={sliderOneValue}
            sliderLength={sliderLength}
            min={0}
            max={withdraw != 0 ? withdraw : 10}
            step={1}
            onValuesChange={sliderOneValuesChange}
            style={{marginTop: 10}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <Button
            mode="contained"
            style={styles.perBtn}
            dark={false}
            onPress={() => fixAmt(25)}>
            25%
          </Button>
          <Button
            mode="contained"
            style={styles.perBtn}
            dark={false}
            onPress={() => fixAmt(50)}>
            50%
          </Button>
          <Button
            mode="contained"
            style={styles.perBtn}
            dark={false}
            onPress={() => fixAmt(75)}>
            75%
          </Button>
          <Button
            mode="contained"
            style={styles.perBtn}
            dark={false}
            onPress={() => fixAmt(100)}>
            100%
          </Button>
        </View>
        <Button
          mode="contained"
          disabled={disable}
          style={{
            marginTop: 25,
            backgroundColor: disable ? '#9795ad' : color.Primary,
            width: '40%',
            alignSelf: 'center',
          }}
          onPress={withdrawApi}
          dark={true}>
          WITHDRAW
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 60,
          paddingHorizontal: 15,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
          Recent Transactions
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
            }}>
            Show All {'>'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topcontainer: {
    backgroundColor: color.Primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 24,
    color: color.Secondary,
    marginTop: 15,
  },
  salaryContainer: {
    marginTop: 15,
    borderRadius: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  textBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  salaryText: {
    fontSize: 22,
    color: 'black',
    marginTop: 10,
  },
  purposeContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    paddingVertical: 18.5,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  purpose: {
    color: 'black',
    fontSize: 16,
  },
  perBtn: {
    backgroundColor: 'white',
    elevation: 7,
  },
});

export default TopLayout;
