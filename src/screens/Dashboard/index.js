import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import BottomNav from './BottomNav';
import TopLayout from './TopLayout';
import TransCard from './TransCard';
import * as color from '../../utils/colors';
import {Modal, Divider} from 'react-native-paper';

const WIDTH = Dimensions.get('screen').width;
const Dashboard = () => {
  const [name, setName] = useState('');
  const [earn, setEarn] = useState(0);
  const [withdraw, setWidthdraw] = useState(0);
  const [loading, setLoading] = useState(true);
  const [Trans, setTrans] = useState([]);
  const [ModalVisibility, setModalVisibility] = useState(false);
  const [purpose, setPurpose] = useState('Select Purpose');
  const [b, setB] = useState(true);
  const [ermsg, setErmsg] = useState('Loading ...');
  const [refresh, setRefresh] = useState(false);

  const openModal = () => {
    setModalVisibility(true);
  };
  const updateTrans = (data, balance) => {
    var trans = Trans;
    trans.unshift(data);
    setTrans(trans);
    setB(!b);
    setWidthdraw(balance);
  };

  const HeaderComponent = () => {
    return (
      <View>
        <TopLayout
          name={name}
          earn={earn}
          withdraw={withdraw}
          purpose={purpose}
          modal={openModal}
          update={updateTrans}
          refresh={refresh}
        />
      </View>
    );
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setPurpose('Select Purpose');
    wait(200).then(() => setRefresh(false));
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://api.ninjasalary.com/get-dummy-dashboard-data/',
      );
      const json = await response.json();
      if (json.status) {
        const data = json.data;
        setName(
          data.first_name + ' ' + data.middle_name + ' ' + data.last_name,
        );
        var withD = data.balance_details.max_allowed_in_paisa / 100;
        setEarn(data.balance_details.available_balance_in_paisa / 100);
        setWidthdraw(withD);
        setLoading(false);
        setRefresh(false);
      }
    } catch (error) {
      console.error(error);
      setErmsg('Check Internet / Try again later');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={color.Primary} barStyle="light-content" />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[color.Tertiary, color.Primary]}
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        }
        data={Trans}
        ListHeaderComponent={HeaderComponent}
        extraData={b}
        renderItem={item => {
          return (
            <View>
              <TransCard data={item.item} />
            </View>
          );
        }}
      />
      <View style={{position: 'absolute', bottom: 0, width: WIDTH}}>
        <BottomNav />
      </View>
      <Modal visible={loading} dismissable={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              padding: 20,
              backgroundColor: 'white',
              color: 'black',
              borderRadius: 8,
            }}>
            {ermsg}
          </Text>
        </View>
      </Modal>
      <Modal
        visible={ModalVisibility}
        onDismiss={() => {
          setModalVisibility(false);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisibility(false);
                setPurpose('Medical');
              }}>
              <Text numberOfLines={1} style={styles.text}>
                Medical
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                setModalVisibility(false);
                setPurpose('Investment');
              }}>
              <Text numberOfLines={1} style={styles.text}>
                Investment
              </Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={() => {
                setModalVisibility(false);
                setPurpose('Expenses');
              }}>
              <Text numberOfLines={1} style={styles.text}>
                Expenses
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 10,
    padding: 5,
    fontSize: 16,
    color: 'grey',
  },
});

export default Dashboard;
