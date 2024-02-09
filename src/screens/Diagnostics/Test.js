//Test And Packages Screen Can Be Used Interchangeably
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import CButton from '../../components/CButton';
import {useNavigation} from '@react-navigation/native';
// import {brandColor} from '../../constants/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const FewTests = [
  {
    name: 'Diabetes Care',
    price: 235,
    description: 'Diabetic care and etc etc etc etc etc etc',
    reportTime: '15 min',
    discount: '54%',
  },
  {
    name: 'Diabetes Care',
    price: 235,
    description: 'Diabetic care and etc etc etc etc etc etc',
    reportTime: '15 min',
    discount: '54 %',
  },
  {
    name: 'Diabetes Care',
    price: 235,
    description: 'Diabetic care and etc etc etc etc etc etc',
    reportTime: '15 min',
  },
];

const Test = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 18,
              color: '#000',
            }}>
            Tests
          </Text>
          <Text
            style={styles.vAll}
            onPress={() => navigation.navigate('AllTests')}>
            View All
          </Text>
        </View>
        <FlatList
          data={FewTests}
          keyExtractor={(item, index) => item.tc_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            // let discount=item.discount
            return (
              <View style={styles.splLayout}>
                <View style={styles.layoutItems}>
                  <View style={styles.top}>
                    <Text style={styles.name}>
                      {item.name != null ? item.name : ''}
                    </Text>
                    <Text>{item.description}</Text>
                  </View>
                  <View style={styles.bottom}>
                    <Text style={styles.price}>
                      `Report in {item.reportTime}`
                    </Text>
                    <Text>₹ {item.price}</Text>

                    {item.discount ? (
                      <Text style={styles.discount}>Save {item.discount}</Text>
                    ) : null}
                    <CButton
                      Text="Book"
                      onPress={() => console.warn('Booked')}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  vAll: {
    marginLeft: 50,
    fontSize: 18,
    color: '#000',
    textDecorationLine: 'underline',
  },
  splLayout: {
    // margin:5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  layoutItems: {
    padding: 15,
  },
  top: {
    display: 'flex',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    color: '#000',
  },
  price: {
    // marginTop:10,
    // marginBottom:10
    // display:'flex',
    // flexDirection:'row',
  },
  discount: {
    // marginLeft:5
  },
  //   button: {
  //     alignItems: "center",
  //     backgroundColor: brandColor,
  //     padding: 10,
  //     paddingLeft:40,
  //     paddingRight:40,
  //     borderRadius:5
  //   },
});
