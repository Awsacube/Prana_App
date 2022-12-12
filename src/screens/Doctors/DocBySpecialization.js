import { StyleSheet, Text, View ,FlatList,TouchableOpacity,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React,{useState,useEffect} from 'react'
import { getToken } from '../../services/AsyncStorageService';
import DoctorCard from './DoctorCard'
import { useGetDoctorsBySpecializationQuery } from '../../services/userAuthApi';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
var screenwidth = Dimensions.get('window').width; //full width
var screenheight = Dimensions.get('window').height; //full height






const DocBySpecialization = ({route}) => {    

  const doctorDetails=[
    // {
    //   "name": "Ekta maretta",
    //   "image": require('./docassets/stethoscope_bg.png'),
    //   "Experience":"7",
    //   "Specialization":"Pediatrician"
    // },
    // {
    //   "name": "saravanan",
    //   "image": require('./docassets/hairface_bg.png'),
    //   "Experience":"7",
    //   "Specialization":"General physician"
    // }
]
  const navigation=useNavigation();

 
  useEffect(()=>{
    const getT=async()=>{
        const token=await getToken() //getting token from storage
        setUserLToken(token) //store token in local storage
     }
      getT()
    },[]
    )
    const[userLToken,setUserLToken]=useState()

      const { id } = route.params;

      const queryItems={token:userLToken,
        id:id}


        const {data,isLoading,isFetching,error,isSuccess}=useGetDoctorsBySpecializationQuery(queryItems)

        // const res=useGetDoctorsBySpecializationQuery(queryItems)

        // console.warn("specializations",res);

        // const res=data.doctors;

        {error && console.warn("Special",error)}
        {isSuccess && console.warn("specializations",data)}
        {isSuccess &&  (data.doctors).forEach(element => {
            const uuid=element.uuid;
            const first_name=element.first_name;
            const last_name=element.last_name;
            const image=element.image;
            const title=element.title;
            const id=element.id
            doctorDetails.unshift({"first_name":first_name,"last_name":last_name,"image":image,"uuid":uuid,"title":title,"id":id})
          });}

  return (
    // <SafeAreaView>
    // <View>
    //    <DoctorCard data={doctorDetails}/>
    // </View>
    // </SafeAreaView>
    <SafeAreaView>
    <View>
        <FlatList
            data={doctorDetails}
            keyExtractor={(item, index) => item.tc_id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              // let discount=item.discount
              return (
                <TouchableOpacity onPress={()=>navigation.navigate('DoctorDetails',{id:item.id,uuid:item.uuid})}>
                <View style={styles.splLayout}>
                <View style={styles.top}>
                  <Image source={item.image} style={styles.img}/>
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
  )
}

export default DocBySpecialization

const styles = StyleSheet.create({

  splLayout:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    // backgroundColor:'red',
    margin:6,
    borderRadius:10    
  },

  top:{
    width: screenwidth / 6,
    height: screenheight / 11,
    alignSelf: 'center',
  },
  img:{
     width:undefined,
     height:undefined,
     flex:1
  },
  bottom:{
    display:'flex',
    justifyContent:'space-evenly'
  },
  name:{
    fontWeight:'bold'
  }


})