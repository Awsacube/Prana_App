import React,{useState} from 'react'
import { View, Text , Image,useWindowDimensions,StyleSheet,ScrollView,ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import Logo from '../../assets/images/Logo.png' 
import Custominput from '../components/Custominput'
import Custombutton from '../components/Custombutton'
import SocialSigninButton from '../components/SocialSigninButton'
import { useNavigation } from '@react-navigation/native'
import background from './signback.jpeg';
import Logo from './LOGO.png'
import SelectDropdown from 'react-native-select-dropdown'
import { TextInput } from 'react-native-gesture-handler'
import { useRegisterUserMutation } from '../services/userAuthApi'
import Signin from './Signin'
import { storeToken } from '../services/AsyncStorageService'

const countriesCode = ["+91"]

const Signup = () => {
    const[first_name,setFirstName]=useState("");
    const[last_name,setLastName]=useState("");    
    const[password,setPassword]=useState("");
    const[phone_number,setMobile]=useState("");
    const[phone_ext,setcCode]=useState("+91");
    const[email,setEmail]=useState("");
    const[address,setAddress]=useState("");


    const {height}=useWindowDimensions();
    const navigation=useNavigation();

    const[registerUser]=useRegisterUserMutation();

    const OnSignup=async()=>{
        const formData={first_name,last_name,email,password,phone_ext,phone_number,address}
        const res = await registerUser(formData);
        navigation.navigate("Signin")
    }

    const OnSignInPressed=()=>{
        navigation.navigate("Signin")
    }

   

    const onTermsPressed=()=>{
        console.warn("Terms")
    }
    const onPrivacyPressed=()=>{
        console.warn("Privacy")
    } 
    return (    
        <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={background} style={styles.image}>
        <View style={styles.root}>
        <Image source={Logo} style={[styles.logo,{height:height*0.3}]} resizeMode='contain'/> 
            {/* <Text style={styles.logo}>Pillbox</Text> */}
            <Text style={styles.title}>Create an Account</Text>
            <Custominput placeholder="FirstName" value={first_name} setValue={setFirstName}/>
            <Custominput placeholder="LastName" value={last_name} setValue={setLastName}/>
            <Custominput placeholder="Email" value={email} setValue={setEmail}/>
            <View style={styles.phone}>
            {/* <SelectDropdown data={countriesCode} defaultValue={+91} disabled={true} value={phone_ext} style={styles.phoneCode}/> */}
            <Custominput placeholder="Mobile" value={phone_number} setValue={setMobile} style={styles.phoneNum}/>
            </View>
            <Custominput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <Custominput placeholder="Address" value={address} setValue={setAddress}/>
            {/* <Custominput placeholder="Repeat Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}/>  */}
            <Custombutton text='Register' onPress={OnSignup}/>
            {/* <Text style={styles.text}>By Registering Confirm That You Accept our {' '}<Text style={styles.link} onPress={onTermsPressed}>Terms Of Use </Text>And {' '}<Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text></Text> */}
            <Custombutton text="Have an account? Sign in" onPress={OnSignInPressed} type="TERTIARY"/>
        </View>
        </ImageBackground>

        </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    phone:{
        display:'flex',
        flexDirection:'row'
    },
    SelectDropdown:{
    },
    phoneNum:{
    },
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

export default Signup;