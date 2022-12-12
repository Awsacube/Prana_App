//Test And Packages Screen Can Be Used Interchangeably
import { StyleSheet, Text, View,FlatList ,Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Dimensions } from 'react-native'
import CButton from '../../components/CButton';
import { useNavigation } from '@react-navigation/native';
import { brandColor } from '../../constants/constants'
import { getToken } from '../../services/AsyncStorageService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetTestsByFilterQuery,useAddToLabCartMutation } from '../../services/userAuthApi';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height


// const allTests=[ {
//     "name": "Diabetes Care",
//     "price":235,
//     "description":"Diabetic care and etc etc etc etc etc etc",
//     "reportTime":"15 min",
//     "discount":"54%"
//   },
//   {
//     "name": "Diabetes Care",
//     "price":235,
//     "description":"Diabetic care and etc etc etc etc etc etc",
//     "reportTime":"15 min",
//     "discount":"54 %"
//   },
//   {
//     "name": "Diabetes Care",
//     "price":235,
//     "description":"Diabetic care and etc etc etc etc etc etc",
//     "reportTime":"15 min",
//   },
// ]



const TestsByFilter = ({route}) => {

    const {id} = route.params;

  const[userLToken,setUserLToken]=useState()

  useEffect(()=>{
    const getT=async()=>{
        const token=await getToken() //getting token from storage
        setUserLToken(token) //store token in local storage
     }
      getT()
    },[]
    )

  const navigation=useNavigation();
  const {data,isLoading,isFetching,error,isSuccess,refetch}=useGetTestsByFilterQuery(id)
    // const res=useGetTestsByFilterQuery(id)
//   console.warn("res",id)
  const allTests=[];

  {isSuccess &&  data.tests.forEach(element => {
    // console.warn(element)
    const uuid=element.uuid;
    const name=element.name;
    const image=element.image;
    const discount=element.discount;
    const price=element.price;
    const tat=element.report_tat;
    const tatUnit=element.report_tat_unit;
    const content=element.content;
    allTests.unshift({"name":name,"image":image,"uuid":uuid,"price":price,"discount":discount,"content":content,"tat":tat,"tatUnit":tatUnit})
  });}


  const [addToCart]=useAddToLabCartMutation({route}); //send cart data to backend
  // const { refecth }=useGetAllCartItemsQuery();
  // const cartData={
  // id:productid,
  // // quantity:quantity,
  // token:userLToken}
  const addToCartHandler=async(productid)=>{
    console.warn("productid",productid)
    const cartData={
      id:productid,
      token:userLToken}
      await addToCart(cartData)
      // refecth();
  }

  return (
    <SafeAreaView>
    <View>
    {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <Text style={{
          marginLeft: 15,
          fontSize: 18,
          color: '#000'
        }}>Tests</Text>
        <Text style={styles.vAll} onPress={()=>navigation.navigate('AllTests')}>View All</Text>
    </View> */}
       <FlatList
            data={allTests}
            keyExtractor={(item, index) => item.tc_id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={()=>navigation.navigate('TestsAndPackagesById',{id:item.uuid,TestorPackname:item.name})}>
                <View style={styles.splLayout}>
                <View style={styles.layoutItems}>
                <View style={styles.top}>
                <Text style={styles.name}>
                    {item.name != null ? item.name : ""}
                </Text>
                <Text>
                    {item.content}
                </Text>
                <Text>{item.description}</Text>
                </View>
                <Text style={styles.price}>Report in {item.tat} {item.tatUnit}</Text>
                <View style={styles.bottom}>
                <Text>₹ {item.price}</Text> 
                {  item.discount ? 
                  <Text style={styles.discount}>Discount {item.discount}%</Text>  : null
                }
                <CButton Text="Book" onPress={()=>addToCartHandler(item.uuid)}/> 
                </View>
                </View>
                </View>
                </Pressable>
              );
            }}
          />
    </View>
    </SafeAreaView>
  )
}

export default TestsByFilter

const styles = StyleSheet.create({
  vAll:{
    marginLeft:50,
    fontSize: 18,
          color: '#000',
          textDecorationLine:'underline'
  },
    splLayout: {
        // margin:5,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
        // alignContent: 'center',
        backgroundColor:'#fff',
        marginBottom:10
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
      name:{
        fontSize: 20,
        color: '#000',
      },
      price:{
        // marginTop:10,
        // marginBottom:10
        // display:'flex',
        // flexDirection:'row',
      },
      discount:{
          // marginLeft:5
      }
    //   button: {
    //     alignItems: "center",
    //     backgroundColor: brandColor,
    //     padding: 10,
    //     paddingLeft:40,
    //     paddingRight:40,
    //     borderRadius:5
    //   },

})