import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { getToken } from '../services/AsyncStorageService';
import { useDispatch,useSelector } from 'react-redux';
import {login} from '../app/auth-slice'
import { useNavigation } from '@react-navigation/native'
import HomeScreen from './HomeScreen/HomeScreen';



const Splash = () => {
    const dispatch=useDispatch();
    const navigation=useNavigation();

    const[userLToken,setUserLToken]=useState(null)

    useEffect(()=>{
        const getT=async()=>{
            const token=await getToken() //getting token from storage
            setUserLToken(token) //store token in local storage
         }
          getT()
        },[]
        )
    {
        if(userLToken!==null){
            dispatch(login(true))
        }
    }
    
    const isSignedIn=useSelector((state)=>state.auth.isSignedIn)
    console.warn("spalsh",isSignedIn)
    {
        if(isSignedIn){
            navigation.navigate("HomeScreen")
        }
        else{
            navigation.navigate("Signin")
        }
    }

  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})