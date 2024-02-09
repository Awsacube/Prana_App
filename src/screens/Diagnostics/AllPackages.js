//Test And Packages Screen Can Be Used Interchangeably
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import CButton from '../../components/CButton';
import {useNavigation} from '@react-navigation/native';
// import {brandColor} from '../../constants/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetAllPackagesQuery} from '../../services/userAuthApi';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const AllPackages = () => {
  const navigation = useNavigation();
  const {data, isLoading, isFetching, error, isSuccess, refetch} =
    useGetAllPackagesQuery();

  console.log('Alltests', data);
  const allPackages = [];

  {
    isSuccess &&
      data.data.forEach(element => {
        console.warn(element);
        const uuid = element.uuid;
        const name = element.name;
        const image = element.image;
        const discount = element.discount;
        const price = element.price;
        const tat = element.report_tat;
        const tatUnit = element.report_tat_unit;
        const content = element.content;
        allPackages.unshift({
          name: name,
          image: image,
          uuid: uuid,
          price: price,
          discount: discount,
          content: content,
          tat: tat,
          tatUnit: tatUnit,
        });
      });
  }

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={allPackages}
          keyExtractor={(item, index) => item.tc_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={styles.splLayout}>
                <View style={styles.layoutItems}>
                  <View style={styles.top}>
                    <Text style={styles.name}>
                      {item.name != null ? item.name : ''}
                    </Text>
                    <Text>{item.content}</Text>
                    <Text>{item.description}</Text>
                  </View>
                  <Text style={styles.price}>
                    Report in {item.tat} {item.tatUnit}
                  </Text>
                  <View style={styles.bottom}>
                    <Text>₹ {item.price}</Text>
                    {item.discount ? (
                      <Text style={styles.discount}>
                        Discount {item.discount}%
                      </Text>
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

export default AllPackages;

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
