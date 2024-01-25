import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import diagn from '../assets/pillboxservices/diagnostics.png';
import doctor from '../assets/pillboxservices/doctor.jpeg';
import hproducts from '../assets/pillboxservices/healthproducts.png';
import medicineImagepng from '../assets/pillboxservices/medicenes.png';
import CategoriesListCard from './CategoriesListCard';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height

const {width, height} = Dimensions.get('window');
const scrollX = new Animated.Value(0);

let position = Animated.divide(scrollX, width);

export default function App() {
  const navigation = useNavigation();

  const categorylist = [
    {
      name: 'Medicines',
      image: medicineImagepng,
      navigateTo: 'Categories',
    },
    {
      name: 'Doctor',
      image: doctor,
      navigateTo: 'Appointments',
    },
    {
      name: 'Diagnostic',
      image: diagn,
      navigateTo: 'Lab Tests',
    },
    {
      name: 'Health Products',
      image: hproducts,
      navigateTo: 'Categories',
    },
  ];

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginLeft: 15,
          marginTop: 15,
          marginBottom: 15,
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000',
        }}>
        Health Care
      </Text>
      <View
        style={{
          marginTop: 4,
        }}>
        <FlatList
          data={categorylist}
          keyExtractor={(item, index) => item.tc_id}
          vertical
          numColumns={4}
          renderItem={({item, index}) => {
            const goto = () => {
              navigation.navigate(item.navigateTo);
            };

            return (
              <CategoriesListCard
                icon={item.image}
                productname={item.name}
                onPress={goto}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginBottom: 20,
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
    borderWidth: 1,
  },
  TextInputStyleClass: {
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#FFF',
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    flex: 1,
  },
  RectangleShapeView: {
    width: screenwidth / 1.1,
    height: screenheight / 3.8,
    backgroundColor: '#6495ED',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  circleViolet: {
    width: 239,
    height: 134,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 100,
    backgroundColor: '#596AB2',
    transform: [{scaleX: 1.2}],
  },
  ballonshape: {
    height: 120,
    width: 120,
    backgroundColor: '#CCCCFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  uploadText: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
    textAlign: 'center',
  },
  orderText: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  prescText: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 14,
    color: '#fff',
  },
});
