import { StyleSheet, Text, View ,Button,Platform,PermissionsAndroid,ToastAndroid} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React,{useState,useEffect} from 'react'
import Geolocation from 'react-native-geolocation-service'
import { useLocationQuery } from '../services/userAuthApi'
import { useScrollTrigger } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { setlocation,setCity,setPostalCode,setSkip } from '../app/location-slice'
// import { setSkip } from '../app/location-slice'
import { useDispatch,useSelector } from 'react-redux';

const Location = () => {

  useEffect(() => {
    getLocation();
}, [])

  // const [skip, setSkip] = useState(true)

  const dispatch=useDispatch();
  const latlongdata=useSelector((state)=>state.location.latlong);
  const skipState=useSelector((state)=>state.location.skip);
  const city=useSelector((state)=>state.location.city);
  const postalCode=useSelector((state)=>state.location.postalCode);

  console.log("skip",skipState)

  const requestLocationPermission = async () => {
    console.log("askpermision")
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
    };
    requestLocationPermission();
     // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log("position",position);
            dispatch(setlocation(position))
            dispatch(setSkip(true))
            // getLocationDetails()  
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            dispatch(setlocation(false))
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    // console.log(location);
    };

    let queryItems;

     if(latlongdata&&skipState===false){

    }

  // if(!latlongdata){
  //  const permission= requestLocationPermission()
  // }


  
 

let res;
//  locationRes=useLocationQuery();

    // const getcitycode=useLocationQuery();
    const {isLoading, error, data, isSuccess, isError } = useLocationQuery(latlongdata,
      {
        skipState
      });

if(isSuccess){
  dispatch(setCity(data.items[0].address.city))
  dispatch(setPostalCode(data.items[0].address.postalCode))
  // console.log("city",data.items[0].address.city)
  // console.log("postalCode",data.items[0].address.postalCode)
  // console.log("data",data)
}

    return (
    <SafeAreaView>
    {/* <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}> */}
    {/* {isSuccess && 
    <View style={styles.container}>
    <Text style={styles.text}>City:{data.items[0].address.city}</Text>
     <Text style={styles.text}>Pincode:{data.items[0].address.postalCode}</Text>
     </View>
    } */}
     <View style={styles.container}>
                {/* <Icon name="phone" color="#E73631" size={28}/> */}
                <Text style={styles.text}>{city}</Text>
                <Text style={styles.text}>{postalCode}</Text>       
    </View>
    </SafeAreaView>
  )
}

export default Location

const styles = StyleSheet.create({
  container:{
    marginLeft:12,
    marginRight:10,
    marginBottom:5,
    backgroundColor:'white',
    display:'flex',
    flexDirection:'row',
    height:50,
    borderRadius:30
},
text:{
    color:'#000',
    paddingTop:15,
    paddingLeft:5,
    fontWeight:'bold'
},
   });