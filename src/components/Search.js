import { StyleSheet, Text, View , TextInput,Pressable} from 'react-native'
import React, { Component } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const Search = (props) => {
  const navigation=useNavigation();

  return (
    <Pressable onPress={()=>navigation.navigate(props.navigate,{component:props.component})}>
    <View style={{flexDirection:'row',borderColor:"#C6C6C6",borderWidth:1,borderRadius:8}}>
       <TextInput
          placeholder={props.placeholder} editable={props.editable}
        />
        <Feather name="search" size={40} color="#C6C6C6"/>
    </View>
    </Pressable>
  )
}

export default Search

const styles = StyleSheet.create({})