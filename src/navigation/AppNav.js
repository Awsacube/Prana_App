import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';
import { useDispatch,useSelector } from 'react-redux'

const AppNav = () => {
        const token=useSelector((state)=>state.auth.userToken)
        // console.warn("token",isLoading)

        // if(isLoading){
        //     return(
        //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        //         <ActivityIndicator size={'large'}/>
        //     </View>
        //     )
            
        // }
        // console.log("token",token)
  return (
    <NavigationContainer>
        {token === 0 ? <AuthStack/> :<AppStack/>}
        {/* {token === false ? <AppStack/> :<AuthStack/>} */}
        {/* <AppStack/> */}
        {/* <AuthStack/> */}
      </NavigationContainer>
  )
}

export default AppNav

const styles = StyleSheet.create({})