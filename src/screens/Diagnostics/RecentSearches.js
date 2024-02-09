import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
// import {brandColor} from '../../constants/constants';

var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const recentSearches = [
  {
    name: 'Diabetes Care',
    image: require('./docassets/stethoscope_bg.png'),
    price: 23,
  },
  {
    name: 'Heart Health',
    image: require('./docassets/hairface_bg.png'),
    price: 23,
  },
  {
    name: 'Lifestyle',
    image: require('./docassets/pregnant_bg.png'),
    price: 23,
  },
  {
    name: 'Thyroid Care',
    image: require('./docassets/tooth_bg.png'),
    price: 23,
  },
  {
    name: 'Health Checkups',
    image: require('./docassets/childpatient_bg.png'),
    price: 23,
  },
  {
    name: 'RTPCR',
    image: require('./docassets/throat.png'),
    price: 23,
  },
  {
    name: 'Women Care',
    image: require('./docassets/mental_bg.png'),
    price: 23,
  },
  {
    name: 'Monsoon Care',
    image: require('./docassets/bone_bg.png'),
    price: 23,
  },
];

const RecentSearches = () => {
  return (
    <View>
      <View>
        <Text
          style={{
            marginLeft: 15,
            marginTop: 10,
            marginBottom: 20,
            fontSize: 18,
            color: '#000',
          }}>
          Recent Searches By You
        </Text>
        <FlatList
          data={recentSearches}
          keyExtractor={(item, index) => item.tc_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={styles.splLayout}>
                <View style={styles.top}>
                  <Text style={styles.splname}>
                    {item.name != null ? item.name : ''}
                  </Text>
                  <Image source={item.image} style={styles.splimage} />
                </View>
                <View>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default RecentSearches;

const styles = StyleSheet.create({
  splLayout: {
    width: 200,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
  },
  splimage: {
    width: screenwidth / 6,
    height: screenheight / 11,
    alignSelf: 'center',
    borderRadius: 50,
    margin: 5,
  },
  splname: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    height: 40,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  price: {},
});
