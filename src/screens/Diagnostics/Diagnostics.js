import { View, Text ,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Diagnostics = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Diagnostics</Text>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    // marginTop:60,
  }
})

export default Diagnostics