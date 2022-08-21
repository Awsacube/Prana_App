import React ,{useState,useEffect} from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getToken } from '../../services/AsyncStorageService';
import { removeToken } from '../../services/AsyncStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { useNavigation } from '@react-navigation/native';
import { useUserLogOutMutation } from '../../services/userAuthApi';
import Signin from '../Signin';

export default function Profile() {

   //getandusetoken
   const[userLToken,setUserLToken]=useState()

  useEffect(()=>{
    const getT=async()=>{
        const token=await getToken() //getting token from storage
        setUserLToken(token) //store token in local storage
     }
      getT()
    },[]
    )

   const navigation=useNavigation();

  //  const res = useGetLoggedUserQuery(userLToken)
  //  console.warn(res);

   const profile=[];

  //  if(res.isLoading===false){
  //   const data=res.data
  //   console.warn(data.first_name)
  //   profile.push(data.first_name);
  // }
  

   
  const[logoutUser]=useUserLogOutMutation();

   const onLogoutPressed=async()=>{
      const res=await logoutUser(userLToken)
      console.log(res)
      navigation.navigate("Signin");
      removeToken();
   }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={{
        backgroundColor: '#234'
      }}>

        <Text style={styles.profileText}>{profile[0]}</Text>
      </View>
{/* 
      <View style={{ flexDirection: 'row', margin: 15 }}>

        <View style={{ flex: 1, flexDirection: 'row', }}>

          <View style={styles.imageLayout} >
            <Icon name="thermometer-low" size={30} color="#566573" />
          </View>
          <Text style={styles.text}>172.00 cm</Text>

        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>

          <View style={styles.imageLayout} >

            <Icon name="weight" size={30} color="#566573" />

          </View>

          <Text style={styles.text}>94Kg</Text>


        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

          <View style={styles.imageLayout} >
            <Icon name="human-male" size={30} color="#566573" />
          </View>

          <Text style={styles.text}>Male</Text>

        </View>

      </View> */}


      <View style={styles.listLayout}>

      <View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Edit Profile</Text>

</View>



        <View style={{ flexDirection: 'row', margin: 5 }}>

          <View style={styles.iconDesign}>

            <Icon name="cart-outline" size={25} color="#000" />

          </View>

          <Text style={styles.textDesign}>Order History</Text>

        </View>

        <View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Prescriptions</Text>

</View>

<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Wish List</Text>

</View>

<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Need Help</Text>

</View>

<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Wallet</Text>

</View>


<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Deactivate Profile</Text>

</View>

<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Refer & Earn</Text>

</View>

<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Terms & Conditions</Text>

</View>

<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Privacy Policies</Text>

</View>

<View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>FAQ's</Text>

</View>


        <View style={{ flexDirection: 'row', margin: 5 }}>

<View style={styles.iconDesign}>

  <Icon name="cart-outline" size={25} color="#000" />

</View>

<Text style={styles.textDesign}>Returns</Text>

</View>

        <View style={{ flexDirection: 'row', margin: 5 }}>

          <View style={styles.iconDesign}>

            <Icon name="doctor" size={25} color="#000" />

          </View>

          <Text style={styles.textDesign}>Health Records</Text>

        </View>

        <View style={{ flexDirection: 'row', margin: 5 }}>

          <View style={styles.iconDesign}>

            <Icon name="home" size={25} color="#000" />

          </View>

          <Text style={styles.textDesign}>Manage Address</Text>

        </View>

      

        
        <View style={{ flexDirection: 'row', margin: 5 }}>

          <View style={styles.iconDesign}>

            <Icon name="cash-refund" size={25} color="#000" />

          </View>

          <Text style={styles.textDesign}>Refund Payment</Text>

        </View>

        <View style={{ flexDirection: 'row', margin: 5 }}>

          <View style={styles.iconDesign}>

            <Icon name="logout" size={25} color="#000" />

          </View>

          <Text style={styles.textDesign} onPress={onLogoutPressed}>Logout</Text>

        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    // marginTop:60,
    flex: 1,
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#D6DBDF'
  },
  imageLayout: {
    width: 35,
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 22,
    height: 22,
  },
  text: {
    textAlignVertical: 'center',
    marginLeft: 5,
  }, 
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: '#2874A6',
    borderWidth: 3,
    marginLeft: 15,
    marginTop: 10
  }, profileText: {
    width: 80,
    textAlign: 'center',
    marginLeft: 15,
    marginBottom: 5
  },
  listLayout: {
    backgroundColor: '#fff',
    elevation: 8,
    marginLeft: 10,
    marginRight: 10,
    padding: 12,
    borderRadius: 10
  },
  iconDesign: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#D6DBDF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textDesign: {
    fontSize: 15,
    marginLeft: 15,
    textAlignVertical: 'center',
  }

});