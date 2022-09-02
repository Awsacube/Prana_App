import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const EmptyPage = ({ navigation, route }) => {

  const { component } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => component
    });
  });
  
  return (
    <SafeAreaView>
        <View style={styles.back}>
        
        </View>
    </SafeAreaView>
  )
}

export default EmptyPage

const styles = StyleSheet.create({

    back:{
        backgroundColor:'#ffffff',
    }

})