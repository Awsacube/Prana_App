import { StyleSheet, Text, View , FlatList,TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React ,{useState,useEffect} from 'react';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { useEditProfileMutation } from '../../services/userAuthApi';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../services/AsyncStorageService';
import Custominput from '../../components/Custominput';
import Custombutton from '../../components/Custombutton';


const EditProfile = () => {

    const navigation=useNavigation();

    const[first_name,setFirstName]=useState("");
    const[last_name,setLastName]=useState("");    
    const[phone_number,setMobile]=useState("");
    const[street_1,setStreet_1]=useState("");
    const[street_2,setStreet_2]=useState("");
    const[district,setDistrict]=useState("");
    const[state,setState]=useState();
    const[pincode,setPincode]=useState("");
    const[userLToken,setUserLToken]=useState()

    useEffect(()=>{
     const getT=async()=>{
         const token=await getToken() //getting token from storage
         setUserLToken(token) //store token in local storage
      }
       getT()
     },[]
     )

     const[editProfile]=useEditProfileMutation(userLToken);

     const Save=async()=>{
        const newData={first_name,last_name,phone_number,userLToken,city,state,district,pincode,street_1,street_2}
        const {data,isSuccess,error} = await editProfile(newData);
        navigation.navigate("Home")
    }

     const {data,isSuccess} = useGetLoggedUserQuery(userLToken,{ refetchOnMountOrArgChange: true })

     const profile=[];

    //  if(isSuccess){
    //   profile.push(data);
    //   console.warn(profile);
    // }

    {isSuccess && profile.push(data)}

    // const handleChange = event => {
    //   setFirstName(event.target.value);
    // };

    // console.warn(profile)
    
//     { isSuccess && profile.map((item)=>{
//         const fname=item.first_name
//         const lname=item.last_name
//         const pnumber=phone_number
//         const email=email
//         profile.push({"first_name":fname,"last_name":lname,"email":email,"phone_number":pnumber})
//         console.log("profile",profile);
//   })
//  }

  return (
    <SafeAreaView>
    {/* {isSuccess && profile.map((item)=>(
        <View>
        <Custominput placeholder="FirstName" value={item.first_name} setValue={setFirstName}/>
        <Custominput placeholder="LastName" value={item.last_name} setValue={setLastName}/>
        <Custominput placeholder="10 digit Mobile Number" value={item.phone_number} setValue={setMobile} style={styles.phoneNum}/>
        <Custombutton text='Save' onPress={Save}/>    
        </View>
    ))
    } */}


    <FlatList
            data={profile}
            keyExtractor={(item, index) => item.uuid}
            showsHorizontalScrollIndicator={false}

            renderItem={({ item, index }) => {    
              // setFirstName(item.first_name)
              // setLastName(item.last_name)        
              // setMobile(item.phone_number)        
              // setStreet_1(item.address.street_1)  
              // setStreet_2(item.address.street_2)          
              // setCity(item.address.city)        
              // setDistrict(item.address.district)        
              // setPincode(item.address.pincode)      
              // setState(item.address.state)  
                return (
                  <View style={styles.container}>
                  <TextInput defaultValue={item.first_name} placeholder="FirstName" style={styles.input} onChangeText={(e)=>setFirstName(e)}/>
                  <TextInput defaultValue={item.last_name} placeholder="LastName" style={styles.input} onChangeText={(e)=>setLastName(e)}/>
                  <TextInput defaultValue={item.phone_number} placeholder="10 digit Mobile" style={styles.input} onChangeText={(e)=>setMobile(e)}/>
                  <TextInput defaultValue={item.address.street_1} placeholder="Address Line 1" style={styles.input} onChangeText={(e)=>setStreet_1(e)}/>
                  <TextInput defaultValue={item.address.street_2} placeholder="Address Line 2" style={styles.input} onChangeText={(e)=>setStreet_2(e)}/>
                  <TextInput defaultValue={item.address.city} placeholder="City" style={styles.input} onChangeText={(e)=>setCity(e)}/>
                  <TextInput defaultValue={item.address.district} placeholder="District" style={styles.input} onChangeText={(e)=>setDistrict(e)}/>
                  <TextInput defaultValue={item.address.state} placeholder="State" style={styles.input} onChangeText={(e)=>setState(e)}/>
                  <TextInput defaultValue={item.address.pincode} placeholder="Pincode" style={styles.input} onChangeText={(e)=>setPincode(e)}/>
                  <Custombutton text='Save' onPress={Save}/>    
                  </View>
              );
            }}
          />
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({

//   container:{
//     backgroundColor:'white',
//     height:50,
//     width:'100%',
//     borderColor:'#e8e8e8',
//     borderWidth:1,
//     borderRadius:5,
//     paddingHorizontal:10,
//     marginVertical:5
// },

input:{
    alignItems:'center',
    justifyContent:'center',
    paddingTop:15,
}

})