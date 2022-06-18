import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fontFamily, fontSize } from '@mui/system'
import comingsoon from '../screens/comingsoon.jpeg'

const Dummy = () => {
  return (
      <View style={styles.coming}>
      {/* <Text style={styles.text}>Coming Soon</Text> */}
      <Image source={comingsoon} style={styles.img}/>
      </View>
  )
}

export default Dummy

const styles = StyleSheet.create({

coming:{
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'white'
},
img:{
  marginTop:300,
  marginBottom:300
}

})