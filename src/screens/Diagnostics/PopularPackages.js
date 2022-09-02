import { StyleSheet, Text, View ,FlatList} from 'react-native'
import TestsSquareCard from './TestsSquareCard'
import React from 'react'
import { Dimensions } from "react-native";
import { brandColor } from '../../constants/constants';
import { display } from '@mui/system';
const screenwidth = Dimensions.get('window').width; //full width
const screenheight = Dimensions.get('window').height; //full height
import { useNavigation } from '@react-navigation/native';

const allTests=[ {
  "name": "Diabetes Care",
  "price":235,
  "description":"Diabetic care and etc etc etc etc etc etc",
  "reportTime":"15 min",
  "discount":"54%"
},
{
  "name": "Diabetes Care",
  "price":235,
  "description":"Diabetic care and etc etc etc etc etc etc",
  "reportTime":"15 min",
  "discount":"54%"
},
{
  "name": "Diabetes Care",
  "price":235,
  "description":"Diabetic care and etc etc etc etc etc etc",
  "reportTime":"15 min",
  "discount":"54%"

},
{
  "name": "Diabetes Care",
  "price":235,
  "description":"Diabetic care and etc etc etc etc etc etc",
  "reportTime":"15 min",
  "discount":"54%"

},
]


const PopularPackages = () => {

  const navigation=useNavigation();

  return (
    <View>
        <View style={{display:'flex',flexDirection:'row'}}>
        <Text style={{
          marginLeft: 15,
          // marginTop: 10,
          // marginBottom:20,
          fontSize: 18,
          color: '#000'
        }}>Popular Heath Packages</Text>
        <Text style={styles.vAll} onPress={()=>navigation.navigate('AllPackages')}>View All</Text>
        </View>
       <FlatList
            data={allTests}
            keyExtractor={(item, index) => item.tc_id}
            showsHorizontalScrollIndicator={false}
            numColumns={2}

            renderItem={({ item, index }) => {
            
                return (
                <View style={styles.splLayout}>
                <View style={styles.layoutItems}>
                <View style={styles.namedes}>
                <Text style={styles.name}>
                    {item.name != null ? item.name : ""}
                </Text>
                <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.pricedis}>
                <Text style={styles.price}>₹ {item.price}</Text>
                {  item.discount ?  
                  <Text style={styles.discount}>{item.discount} Off</Text>  : null
                }
                </View>
                {/* <View style={styles.bottom}>
                {/* <Text style={styles.price}>`Report in {item.reportTime}`</Text> */}
                {/* <CButton Text="Book" onPress={()=>console.warn("Booked")}/>  */}
                {/* </View> */} 
                </View>
                </View>
              );
            }}
          />
    </View>
  )
}

export default PopularPackages

const styles = StyleSheet.create({

  splLayout:{
    width:screenwidth/2.3,
    height:screenwidth/2,
    backgroundColor:'#fff',
    margin:11,
    borderRadius:10
  },
  layoutItems:{
    padding:15
},    
  top:{
        display:'flex',
  },
  bottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20
  },
  namedes:{
    fontSize: 20,
    color: '#000',
    marginBottom:18
    },

  pricedis:{
    display:"flex",
    flexDirection:'row'
  },
  name:{
    fontWeight:'bold',
  },
  description:{

  },
  vAll:{
    marginLeft:50,
    fontSize: 18,
          color: '#000',
          textDecorationLine:'underline'
  },
  price:{
    // marginTop:10,
    // marginBottom:10
    // display:'flex',
    // flexDirection:'row',
    marginRight:5
  },
  discount:{
    // backgroundColor:brandColor,  
  }

})