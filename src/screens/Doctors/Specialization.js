import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetConsultationSpecializationQuery} from '../../services/userAuthApi';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const Specialization = () => {
  const Specializations = [];

  const navigation = useNavigation();
  const {data, isLoading, isFetching, error, isSuccess} =
    useGetConsultationSpecializationQuery();

  {
    isSuccess &&
      data.data.forEach(element => {
        const uuid = element.uuid;
        const name = element.name;
        const image = element.image;
        Specializations.unshift({name: name, image: image, uuid: uuid});
      });
  }

  return (
    <View>
      <Text style={styles.headin}>Find Doctors By Specialization</Text>
      <View
        style={{
          marginTop: 20,
        }}>
        <FlatList
          data={Specializations}
          keyExtractor={(item, index) => item.tc_id}
          vertical
          numColumns={4}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DocBySpecialization', {id: item.uuid})
                }>
                <View style={styles.splLayout}>
                  <Image source={item.image} style={styles.splimage} />

                  <Text style={styles.splname}>
                    {item.name != null ? item.name : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Specialization;

const styles = StyleSheet.create({
  splLayout: {
    width: screenwidth / 4,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  headin: {
    marginLeft: 15,
    color: '#000',
    fontSize: 20,
  },
  splimage: {
    width: screenwidth / 6,
    height: screenheight / 11,
    alignSelf: 'center',
    backgroundColor: '#D6EAF8',
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
});
