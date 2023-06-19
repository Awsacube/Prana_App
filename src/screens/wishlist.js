import { StyleSheet, Text, View ,Image,FlatList,Pressable} from 'react-native'
import React ,{useState,useEffect}from 'react';
import { useNavigation } from '@react-navigation/native';
import { useWishListQuery } from '../services/userAuthApi';
import { SafeAreaView } from 'react-native-safe-area-context'
import { getToken } from '../services/AsyncStorageService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 

export default function WishList({route}){

  const navigation=useNavigation();

  const productList=[]
 
    const[userLToken,setUserLToken]=useState()

    useEffect(()=>{
      const getT=async()=>{
          const token=await getToken() //getting token from storage
          setUserLToken(token) //store token in local storage
       }
        getT()
      },[]
      )


      const queryItems={token:userLToken}
  
    const res= useWishListQuery(queryItems);
    
    // ,{ refetchOnMountOrArgChange: true }

    if(res.isSuccess===true){
        console.log("wishlistdataproduct",res.data)
      const data=Array.from(res.data);
      console.log("dta",data[0].uuid)
      data.forEach(element => {
          const name=element.product.name;
          const image=element.product.image;
          const price=element.product.price;
          const uuid=element.uuid;
        //   const description=element.description;
          productList.unshift({"name":name,"image":image,"uuid":uuid,"price":price})
        });
    }
  

    return (

      <FlatList
            data={productList}
            keyExtractor={(item, index) => item.tc_id}
            renderItem={({ item, index }) => {
              return (
                <SafeAreaView>
              <Pressable onPress={()=>navigation.navigate('ProductDescription',{productid:item.uuid})} style={styles.root}>
            <View style={styles.container}>
            <View>
            <Image style={styles.image} source={{uri: item.image}}/>
            </View>
            <View style={styles.rightCom}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>MRP:{item.price}</Text>
              <Text>{item.description}</Text>
           </View>
           <View styles={styles.iconDesign} onPress={deleteWishHandler}><Icon name="delete" size={40} color="#E73631"/></View>
          </View>
          </Pressable>
          </SafeAreaView>
);
}}
/>
  )
}


const styles = StyleSheet.create({
  root:{
      display:'flex',
      flexDirection:'column',
      flex:1,
    // margin: 10,
    // borderWidth:1,
    // borderColor:'#d1d1d1',
    // borderRadius:10,
    // backgroundColor:'#fff',
  },
  container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly'

  },
  rightCom:{
  },
  image:{
    width:100,
    height: 100,
    margin:5
  },
  title:{

  },
  price:{

  },
  iconDesign: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#D6DBDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:50
  },
});