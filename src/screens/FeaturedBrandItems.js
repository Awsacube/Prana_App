import { StyleSheet, Text, View,FlatList ,Pressable,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import medicineImagepng from '../assets/pillboxservices/medicenes.png'
import doctor from '../assets/pillboxservices/doctor.jpeg'
import { Card, Button, Icon } from '@rneui/themed';
const screenwidth = Dimensions.get('window').width; //full width
const screenheight = Dimensions.get('window').height; //full height
import { Dimensions } from "react-native";
import { useGetBrandItemQuery } from '../services/userAuthApi';


const FeaturedBrandItems = ({route}) => {
    const { id } = route.params;
    const queryItems={
        id:id}
        const {data,isLoading,isFetching,error,isSuccess,isError}=useGetBrandItemQuery(queryItems);
        isError && console.log("err",error)
        const navigation=useNavigation();
        const brandItemsList = [
          {
            "name": "Medicines",
            "image": doctor,
            "price":256,
            "id":1
          },
          {
            "name": "Doctor",
            "image": medicineImagepng,
            "price":523,
            "id":2
          },
          {
            "name": "Doctor",
            "image": medicineImagepng,
            "price":523,
            "id":3
          },
          {
            "name": "Medicines",
            "image": doctor,
            "price":256,
            "id":4
          },
        ];

        isSuccess && brandItemsList.push(data.items)

        // const categorylist = [];
      // const res=useGetBrandItemQuery(queryItems);
    
        // console.log("response",res.data)
    //   if(res.isSuccess===true){
    //     const data=res.data.data;
    //     data.forEach(element => {
    //         const name=element.name;
    //         const image=element.image;
    //         const uuid=element.uuid;
    //         categorylist.unshift({"name":name,"image":image,"uuid":uuid})
    //         console.log("bitem",categorylist)
    //       });
    //   }
  return (
    <FlatList
            data={brandItemsList}
            // numColumns={2}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => {
              return (
                // onPress={()=>navigation.navigate('ProductDescription',{productid:item.uuid})}
                <SafeAreaView style={styles.container}>
            {/* <View>
            <View>
            <Image style={styles.image} source={item.image}/>
            </View>
            <View style={styles.rightCom}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>MRP:{item.price}</Text>
              <Text>{item.description}</Text>
           </View>
          </View> */}
          <View>
          <Card>
          <Card.Image
            source={item.image}
          />
          <Text style={{ marginBottom: 10 }}>
            {item.name}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            INR: {item.price}
          </Text>
        </Card>
        </View>
          </SafeAreaView>
);
}}
/>
  )
}

export default FeaturedBrandItems

const styles = StyleSheet.create({
  container:{
    // display:'flex',
    // flexWrap:'wrap',
    width:screenwidth/2,
    flexDirection:'row',
    margin: 0,
     borderWidth:1,
  borderColor:'#d1d1d1',
  // borderRadius:10,
  // backgroundColor:'#fff',
},
Card:{
    // flexGrow:1
}
// rightCom:{
// },
// image:{
//   // width:100,
//   // height: 100,
//   // margin:5
// },
// title:{

// },
// price:{

// },
})