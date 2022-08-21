import React,{useEffect, useState} from 'react'
import { View, Text , Image, StyleSheet ,useWindowDimensions,ScrollView,ImageBackground, ColorPropType} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Logo from './LOGO.png'
import Custominput from '../components/Custominput'
import Custombutton from '../components/Custombutton'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useLoginUserMutation } from '../services/userAuthApi'
import background from './signback.jpeg';
import { storeToken } from '../services/AsyncStorageService'
import Signup from './Signup'
import ForgotPass from './ForgotPassword'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ConstantId} from './token';
import Dummy from './Dummy';
import { SvgUri } from 'react-native-svg';
import { setCredentials } from '../app/auth-slice'





const Signin = () => {

const[email,setEmail]=useState();
const[password,setPassword]=useState();
const[token,setToken]=useState();
const[userName,setUserName]=useState();


    const[loaded,setLoaded]=useState(false);

    const {height,width}=useWindowDimensions();
    const navigation=useNavigation();

    const[loginUser]=useLoginUserMutation();
    
const [signedIn, setsignedIn] = useState(false);

    const OnSignInPressed = async () => {
            const formData={email,password}
            const res = await loginUser(formData);
            await storeToken(res.data.token)
            console.log("logtoken",res.data.token)
            // ConstantId.accessToken = res.data.token;
                console.warn("logtoken",res.data.token)
                navigation.navigate("HomeScreen");
                // console.log("Post nav",)
                // setsignedIn(true);
                setCredentials("Raghu",res.data.token)
          }

        //   const OnSignInPressed = async () => {
        //     const formData={email,password}
        //     const res = await loginUser(formData);
        //     await storeToken(res.data.token)
        //     console.log("logtoken",res.data.token)
        //     // ConstantId.accessToken = res.data.token;
        //         console.warn("logtoken",res.data.token)
        //         navigation.navigate("HomeScreen");
        //         // console.log("Post nav",)
        //         // setsignedIn(true);
        //         setCredentials("Raghu",res.data.token)
        //   }

    const onSignupPressed=()=>{
        navigation.navigate("Signup")
    }

    const onForgotPressed=()=>{
        navigation.navigate("ForgotPass")
    }


    return (
        <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={background} style={styles.bgImage}>
        <View style={styles.root}>
            <Image source={Logo} style={styles.logo} resizeMode='contain'/> 
            {/* <Text style={styles.logo}>Pillbox</Text> */}
            <Custominput placeholder="Email" value={email} setValue={setEmail} autoCapitalize='none'/>
            <Custominput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <Custombutton text='Sign In' onPress={OnSignInPressed}/>
            <Custombutton text='Forgot Password' type="TERTIARY" onPress={onForgotPressed}/>
            <Custombutton text="Don't have an account ? Create one" type="TERTIARY" onPress={onSignupPressed}/>
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
        color:'black',
        background:''
    },
    logo:{
        maxWidth:300,
        maxHeight:200,
    },
    bgImage:{
        // height:750
    }   
})

export default Signin;