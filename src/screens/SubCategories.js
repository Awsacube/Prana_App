import React, { useEffect,useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image, Animated ,ImageBackground, Pressable} from 'react-native';
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
const scrollX = new Animated.Value(0);
const screenwidth = Dimensions.get('window').width; //full width
const screenheight = Dimensions.get('window').height; //full height
import { getToken } from '../services/AsyncStorageService';
import {useSubcategoriesQuery} from '../services/userAuthApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ConstantId} from './token';

let position = Animated.divide(scrollX, screenwidth)

export default function SubCategories({route}) {

  const navigation=useNavigation();


  const[userLToken,setUserLToken]=useState()



  const categorylist = [];

  const { id } = route.params;
  const queryItems={token:userLToken,
    id:id}


  const res=useSubcategoriesQuery(queryItems);

  console.log("subresss",res)

  if(res.isSuccess===true){
    const data=res.data.data;
    data.forEach(element => {
        const name=element.name;
        const image=element.image;
        const uuid=element.uuid;
        categorylist.unshift({"name":name,"image":image,"uuid":uuid})
      });
  }

  
  return (
    <SafeAreaView>
    <ScrollView >
             <View>
    
        <Text style={styles.categoryText}>Shop By Category</Text>

        <View style={{
          marginTop: 15,
        }}>
          <FlatList
            data={categorylist}
            keyExtractor={(item, index) => item.tc_id}
            vertical
            numColumns={3}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={()=>navigation.navigate('ProductItem',{id:item.uuid})}>
                <View style={styles.catLayout}>
                  <View style={styles.imageLayout}>
                    <Image source={{ uri: item.image }} style={styles.image}
                    />
                  </View>
                  <Text style={styles.productname}>
                    {item.name != null ? item.name : ""}
                  </Text>
                </View>
                </Pressable>
              );
            }}
          />
      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
  }, catLayout: {
    width: screenwidth / 3,
    height: screenheight / 5,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  imageLayout: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#90C1E9',
    justifyContent: 'center',
  },
  productname: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    margin: 2,
  },
  categoryText: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    color: '#000'
  },
  dotView: {
    flexDirection: "row",
    justifyContent: "center", 
    position: 'absolute',
    bottom: 0,
    alignSelf:'center'
  },


});
