import { StyleSheet, Text, View ,TouchableOpacity, Dimensions,ScrollView} from 'react-native'
import React from 'react'

const OPTIONS =[1,2,3,4,5,]
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const QuantityModalPicker = (props) => {
  return (
    <View>
        <TouchableOpacity onPress={()=>props.changeModalVisibility(false)} style={styles.container}>
                <View style={[styles.modal]}>

                </View>
        </TouchableOpacity>
    </View>
  )
}

export default QuantityModalPicker

const styles = StyleSheet.create({

container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
},

modal:{
    backgroundColor:'white',
    borderRadius:10
}

})