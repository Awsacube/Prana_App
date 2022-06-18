import { StyleSheet, Text, View,Button,TouchableOpacity,TouchableHighlight,  Linking} from 'react-native'
import React from 'react'
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const Calltoorder = () => {
    const call = () => {
        let number = '';
        if (Platform.OS === 'ios') {
          number = 'telprompt:${+91 8919797512}';
        } else {
          number = 'tel:${+91 8919797512}';
        }
        Linking.openURL(number);
      };
    
  return (
    <TouchableOpacity style={styles.Calltoorder}>
        <Text style={styles.text}>Call to order Medicine</Text>
        <Button title='Call' onPress={call}/>
    </TouchableOpacity>
  )
}

export default Calltoorder

const styles = StyleSheet.create({

    Calltoorder:{
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        display:'flex',
        flexDirection:'row'
    },
    text:{
        color:'#000',
        paddingRight:25
    }

})