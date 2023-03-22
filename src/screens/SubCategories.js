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
  

  // useEffect(()=>{
  //   const getT=async()=>{
  //       const token=await getToken() //getting token from storage
  //       setUserLToken(token) //store token in local storage
  //    }
  //     getT()
  //   },[]
  //   )


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

  // useEffect(() => {
  //  infiniteScroll(categorylist);
  // });

  // function infiniteScroll(dataList) {
  //   const numberOfData = dataList.length;
  //   let scrollValue = 0,
  //     scrolled = 0;

  //   setInterval(function () {
  //     scrolled++;
  //     if (scrolled < numberOfData) scrollValue = scrollValue + screenwidth;
  //     else {
  //       scrollValue = 0;
  //       scrolled = 0;
  //     }
  //    this.flatList.scrollToOffset({ animated: true, offset: scrollValue });
  //   }, 3000);
  // }
 
  
  return (
    <SafeAreaView>
    <ScrollView >
      <View style={styles.container}>

        <FlatList
          data={categorylist}
          // ref={(flatList) => {
          //   this.flatList = flatList;
          // }}

          keyExtractor={(item, index) => item.name}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}

          renderItem={({ item, index }) => {
            return (
              <View style={styles.cardView}>
                <ImageBackground style={{
                  width: screenwidth,
                  height: screenheight / 4,
                }}

                    source={{ uri: item.image }}

                >

                  <View style={styles.dotView}>
                    {categorylist.map((_, i) => {
                      let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp",
                      });
                      return (
                        <Animated.View
                          key={i}
                          style={{
                            opacity,
                            height: 8,
                            width: 8,
                            backgroundColor: "#C0392B",
                            margin: 8,
                            borderRadius: 5,
                          }}
                        />
                      );
                    })}
                  </View>
                </ImageBackground>
              </View>
            );

          }}

          // onScroll={Animated.event([
          //   { nativeEvent: { contentOffset: { x: scrollX } } },
          // ])}
        />



    
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
