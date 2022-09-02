import React, { useRef , useState} from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { Dimensions } from "react-native";
const screenwidth = Dimensions.get('window').width; //full width
const screenheight = Dimensions.get('window').height; //full height
import { useCategoriesQuery } from '../services/userAuthApi';
import { getToken } from '../services/AsyncStorageService';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../components/Search';

export default function Categories() {

  const navigation=useNavigation();

  const[userLToken,setUserLToken]=useState()

  const inputEl=useRef('');



//  useEffect(()=>{
//   const getT=async()=>{
//       const token=await getToken() //getting token from storage
//       setUserLToken(token) //store token in local storage
//    }
//     getT()
//   },[]
//   )

  

  const [categories, setcategories] = useState([])
  const categorylist=[];


    const res=useCategoriesQuery(userLToken);

    // console.log("response",res.data);

    if(res.isSuccess===true){
      const data=res.data.data;

      data.forEach(element => {
        if(element.parent_id===null){
          const name=element.name;
          const image=element.image;
          const uuid=element.uuid;
          categorylist.unshift({"name":name,"image":image,"uuid":uuid})
        }         
        });
    }

    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])    
    const handleChange=(text)=>{
          if(text.length>0){
    setSearchQuery(text)
            const newCatList=categorylist.filter((category)=>{
                return Object.values(category)[0].toLowerCase().includes(searchQuery.toLowerCase())
                // console.log(Object.values(category)[0].includes(searchQuery))
                // .join(" ").toLowerCase().includes(searchQuery)
            })
            setSearchResults(newCatList);
            // console.log(searchResults);
          }
          else{
              setSearchResults(categorylist);
          }
      }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <View style={styles.container}>
      <Text style={styles.categoryText}>All Categories</Text>
      {/* <Search placeholder='Search Categories' value={search} onChangeText={searchitem=>{setSearch(searchitem)}}/> */}
      <View style={{flexDirection:'row',borderColor:"#C6C6C6",borderWidth:1,borderRadius:8}}>
       <TextInput ref={inputEl}
          placeholder={"Search Categories"} onChangeText={text => handleChange(text)}
        />
        {/* <Feather name="search" size={40} color="#C6C6C6"/> */}
      </View>
      {(searchQuery.length<1 ? categorylist : searchResults).map((item,index)=>(
          
            <Pressable onPress={()=>navigation.navigate('SubCategories',{id:item.uuid})} key={item.uuid}>
            <View style={styles.catLayout}>
              <View style={styles.imageLayout}>
                <Image source={{ uri: item.image }} style={styles.image}/>
              </View>
              <Text style={styles.productname}>
                {item.name != null ? item.name : ""}
              </Text>
            </View>
            </Pressable>
      ) 
      )
      }


        {/* <View style={{
          marginTop: 8,
        }}>  */}
          {/* <FlatList
            data={categorylist}
            keyExtractor={(item, index) => item.uuid}
            vertical
            numColumns={4}
            // ListHeaderComponent={renderHeader}
            renderItem={({ item, index }) => {
              return (
                <Pressable onPress={()=>navigation.navigate('SubCategories',{id:item.uuid})}>
                <View style={styles.catLayout}>
                  <View style={styles.imageLayout}>
                    <Image source={{ uri: item.image }} style={styles.image}
                     />
                  </View>

                  <Text style={styles.productname}>
                    {item.name != null ? item.name : ""}
                  </Text>
                </View>
                </Pressable>
                );
            }}
          /> */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
  }, catLayout: {
    width: screenwidth / 4,
    height: screenheight / 5,
    alignItems: 'center',
  },
  image: {
    flex: 1,
     margin: 6
  },
  imageLayout: {
    elevation: 1.1,
    width: 80,
    height: 80,
    borderRadius: 10
  },
  productname: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    margin: 2,
  },
  categoryText: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 20,
    color: '#000'
  }

});