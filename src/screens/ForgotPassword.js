import React,{useState} from 'react'
import { View, Text , Image,useWindowDimensions,StyleSheet,ScrollView,ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
// import Logo from '../../assets/images/Logo.png' 
import Logo from './LOGO.png'
import Custominput from '../components/Custominput'
import Custombutton from '../components/Custombutton'
import SocialSigninButton from '../components/SocialSigninButton'
import { useNavigation } from '@react-navigation/native'
import background from './signback.jpeg';

const ForgotPass = () => {

    const[userName,setUserName]=useState("");

    const {height}=useWindowDimensions();
    const navigation=useNavigation();

    const OnSignin=()=>{
        console.warn("signin")
        navigation.navigate('Signin')
    }

    const OnSendPressed=()=>{
        console.warn("Resend")
        navigation.navigate('NewPass')
    }
    
    return (
        <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={background} style={styles.image}>

        <View style={styles.root}>
        <Image source={Logo} style={[styles.logo,{height:height*0.3}]} resizeMode='contain'/> 
            <Text style={styles.title}>Forgot Password</Text>
            <Custominput placeholder="Email" value={userName} setValue={setUserName}/>
            <Custombutton text='Send verification code' onPress={OnSendPressed}/>
            <Custombutton text="Back to Signin" onPress={OnSignin} type="TERTIARY"/>
        </View>
        </ImageBackground>
        </ScrollView>
        </SafeAreaView>
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

    },
    image:{
        height:750
    } 
})

export default ForgotPass;