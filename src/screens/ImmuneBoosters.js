import { View, Text, FlatList ,SafeAreaView} from 'react-native';
import React from 'react';


const products = [

    {
      name: "Revital H",
      image: require('../../assets/personalcare/rivital.png')

    },
    {
      name: "Dove",
      image: require('../../assets/personalcare/dove.png')

    },
    {
      name: "Dove Powder",
      image: require('../../assets/personalcare/powder.png')

    },
    {
      name: "Himalaya Hair oil",
      image: require('../../assets/personalcare/hairoil.png')

    },
    {
      name: "Jiva Sugar Free",
      image: require('../../assets/personalcare/jiva.png')
    },
    {
      name: "Saffola Honey",
      image: require('../../assets/personalcare/saffola.png')

    },

    {
      name: "Limcee",
      image: require('../../assets/personalcare/limcee.png')
    },
    {
      name: "A to Z Multivitamin",
      image: require('../../assets/personalcare/atoz.jpg')
    },
  ];


  function Card(props) {
    return (
      <View
        style={{
          backgroundColor: '#fdd',
          width: 250,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 3,
          marginVertical: 5,
        }}>
        <Text style={{ fontSize: 50, fontWeight: 'bold' }}>{props.image}</Text>
      </View>
    );
  }


export default function ImmuneBoosters() {

    const renderItem = ({ item }) => {
        return (
          <View>
            <Card {...item[0]} />
            <Card {...item[1]} /> 
          </View>
        );
      }
      
  return (
    <SafeAreaView>
        <Text>Immunity Boost</Text>
        <Text>View All</Text>
        <FlatList data={products}  renderItem={renderItem} horizontal/>
    </SafeAreaView>
  );
}
