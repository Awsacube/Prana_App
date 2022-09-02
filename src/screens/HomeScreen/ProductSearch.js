import { StyleSheet, Text, View ,Pressable,TextInput,FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather'
import React ,{useState}from 'react'
import Search from '../../components/Search';
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useSearchProductsQuery } from '../../services/userAuthApi'
import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';


const ProductSearch = () => {
    const navigation=useNavigation();

  const [searchQuery, setSearchQuery] = useState(skipToken)
  const handleChange=(text)=>{
        if(text.length>0){
      setSearchQuery(text)
        }
        else{
            setSearchQuery(skipToken)
        }
  }

  const {data,isSuccess,isError}=useSearchProductsQuery(searchQuery)

const suggestion=[]

// const res=useSearchTestsAndPackagesQuery(searchQuery)

// console.warn(res.data.data)

// {isError && console.warn(error)}


{isSuccess && console.warn("data",data.data)}
  

// {isSuccess && 
    
//     if(data.data.length !== 0){
//                 data.data.forEach((item)=>{
//                     const name=item.name
//                     const uuid=item.uuid
//                     suggestion.push({"name":name,"uuid":uuid})
//                     console.warn("suggestion",suggestion)
//                 })
// }

// }


// {isSuccess && }
    


    // 



 { isSuccess && data.data.forEach((item)=>{
        const name=item.name
        const uuid=item.uuid
        suggestion.push({"name":name,"uuid":uuid})
        // console.warn("sugge",suggestion)
  })
 }


  return (
    <View>
      {/* <Search placeholder={"Search For Tests , Health Packages"} onChangeText={text => handleChange(text)}/> */}
      <View>      
    <TextInput placeholder={"Search Health Care Products"} onChangeText={text => handleChange(text)}/>

{ isSuccess && 
   
    suggestion.map((item,index)=>(
    <Pressable onPress={()=>navigation.navigate("ProductDescription",{productid:item.uuid})}>
    <View style={styles.sresult}>
    <Text key={item.uuid} style={styles.result}>{item.name}</Text>
    </View>
    </Pressable>
    ) 
    )
}
   
  
      </View>
      

      {/* <Feather name="search" size={40} color="#C6C6C6"/> */}
    </View>
  )
}

export default ProductSearch

const styles = StyleSheet.create({

    result:{
        color:'#000',
        padding:20
    },
    sresult:{
        
    }
})