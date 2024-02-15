import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height
import {Dimensions} from 'react-native';
import {flexbox} from '@mui/system';

const DoctorCard = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={props.data}
          keyExtractor={(item, index) => item.tc_id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            // let discount=item.discount
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('DoctorDetails')}>
                <View style={styles.splLayout}>
                  <View style={styles.top}>
                    <Image source={item.image} style={styles.img} />
                  </View>
                  <View style={styles.bottom}>
                    <Text style={styles.name}>
                      Dr. {item.first_name} {item.last_name}
                    </Text>
                    <Text>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  splLayout: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // backgroundColor:'red',
    margin: 6,
    borderRadius: 10,
  },

  top: {
    width: screenwidth / 6,
    height: screenheight / 11,
    alignSelf: 'center',
  },
  img: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  // name: {
  //   fontWeight: 'bold',
  // },
});
