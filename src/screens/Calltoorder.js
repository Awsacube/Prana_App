import { StyleSheet, Text, View,Button,TouchableOpacity,TouchableHighlight,  Linking} from 'react-native'
import React from 'react'
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { color } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { margin } from '@mui/system';

const Calltoorder = (props) => {
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
    <View style={styles.Calltoorder}>
                {/* <Icon name="phone" color="#E73631" size={28}/> */}
        <Text style={styles.text}>Call To {props.text}</Text>
        <TouchableOpacity style={styles.button} onPress={call}  >
        <Text style={styles.buttonTitle}>Call</Text>
      </TouchableOpacity>
        {/* <Button title='Call' onPress={call} style={{bborderRadius: 50,
    width: 100,
    height: 100,}}/> */}
    </View>
  )
}

export default Calltoorder

const styles = StyleSheet.create({

    Calltoorder:{
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
    button:{
      marginLeft:20,
      marginTop:15,
      marginBottom:7,
      backgroundColor:"#E73631",
      borderRadius:10,
      width:50
    },
    buttonTitle:{
      paddingLeft:10,
      paddingTop:2,
      color:"#ffffff",
      fontWeight:'bold'
    }

})