import React,{useState} from 'react'
import { View, Text , Image,useWindowDimensions,StyleSheet,ScrollView} from 'react-native'
// import Logo from '../../assets/images/Logo.png' 
import Custominput from '../components/Custominput'
import Custombutton from '../components/Custombutton'
import SocialSigninButton from '../components/SocialSigninButton'
import { useNavigation } from '@react-navigation/native'

const Signup = () => {

    const[code,setCode]=useState("");

    const {height}=useWindowDimensions();
    const navigation=useNavigation();

    const OnConfirm=()=>{
        console.warn("confirm")
        navigation.navigate("HomeScreen")
    }

    const OnSignin=()=>{
        console.warn("signin")
        navigation.navigate("signin")
    }

    const OnResend=()=>{
        console.warn("Resend")
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
        {/* <Image source={Logo} style={[styles.logo,{height:height*0.3}]} resizeMode='contain'/>  */}
            <Text style={styles.title}>Confirm Your E-mail</Text>
            <Custominput placeholder="Enter Your Confirmation Code" value={code} setValue={setCode}/>
            <Custombutton text='Confirm' onPress={OnConfirm}/>
            <Custombutton text="Resend Code" onPress={OnResend} type="SECONDARY"/>
            <Custombutton text="Back to Signin" onPress={OnSignin} type="TERTIARY"/>
        </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    root:{
        alignItems:'center',
        padding:20,
    },
    logo:{
        width:'70%',
        maxWidth:300,
        maxHeight:200,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#051C60',
        margin:10
    },
    text:{
        color:'gray',
        marginVertical:10,
    },
    link:{
        color:"#FDB075",

    }
})

export default Signup;