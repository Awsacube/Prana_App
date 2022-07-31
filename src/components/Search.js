import { StyleSheet, Text, View , TextInput} from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

const Search = (props) => {
  return (
    <View style={{flexDirection:'row',borderColor:"#C6C6C6",borderWidth:1,borderRadius:8,paddingHorizontal:5,paddingVertical:5,margin:8}}>
       <Feather name="search" size={20} color="#C6C6C6" style={{marginRight:5}}/>
       <TextInput
          placeholder={props.placeholder}
        />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})