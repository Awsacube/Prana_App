import { StyleSheet, Text, View ,Button} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Location = () => {
  return (
    <SafeAreaView>
    <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
       <Button
         title="Get Location"
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