import { StyleSheet, Text, View ,Button,Platform,PermissionsAndroid,ToastAndroid} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React,{useState,useEffect} from 'react'
import Geolocation from 'react-native-geolocation-service'
const Location = () => {

  //keep track of long latitude
  const[position,setPosition]=useState(null)

  //Function to ask/confirm Location Permission

  const hasLocationPermission = async()=>{

    //ios setup steps havent done ,  do it

    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;

  }

    useEffect(() => {
        hasLocationPermission();
    })
    

    return (
    <SafeAreaView>
    <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
       <Button
         title="Get Location"   
          // onPress={permissionHandle}
         />
     </View>
     <Text>Latitude: </Text>
     <Text>Longitude: </Text>
     <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
       <Button
         title="Send Location"
        />
    </View>
    </SafeAreaView>
  )
}

export default Location

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   });