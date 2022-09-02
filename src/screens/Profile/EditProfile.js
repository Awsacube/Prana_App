import { StyleSheet, Text, View } from 'react-native';
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
        const newData={first_name,last_name,phone_number}
        const {data,isSuccess} = await editProfile(newData);
        if(isSuccess){
            navigation.navigate("Profile")
        }
    }

     const {data,isSuccess} = useGetLoggedUserQuery(userLToken)

     const profile=[];

    //  if(isSuccess){
    //   profile.push(data);
    //   console.warn(profile);
    // }

    {isSuccess && profile.push(data)}

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
    {isSuccess && profile.map((item)=>(
        <View>
        <Custominput placeholder="FirstName" value={item.first_name} setValue={setFirstName}/>
        <Custominput placeholder="LastName" value={item.last_name} setValue={setLastName}/>
        <Custominput placeholder="10 digit Mobile Number" value={item.phone_number} setValue={setMobile} style={styles.phoneNum}/>
        <Custombutton text='Save' onPress={Save}/>    
        </View>
    ))
    }
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({})