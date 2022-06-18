import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,FlatList,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch,useSelector } from 'react-redux'
import CartItem from './CartItem'
import { store } from '../app/store'
import { clearCart } from '../features/cartSlice'
import { Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { useDeleteCartItemsMutation, useGetAllCartItemsQuery } from '../services/userAuthApi'
import { getToken } from '../services/AsyncStorageService'
// import { black } from 'react-native-paper/lib/typescript/styles/colors'
import {ConstantId} from './token';
import { cartActions } from '../app/cart-slice'
import { useFocusEffect } from '@react-navigation/native';



const CartContainer = () => {

  // const cart=useSelector((state)=>state.cart)
  // const dispatch=useDispatch();

  // const removeFromCart=()=>{

  //       dispatch(cartActions.removeFromCart(uuid));

  // }

  // console.warn("cart contain",cart);

  let total=0;

  let itemsList = useSelector((state)=>state.cart.itemsList);

  itemsList.forEach((item)=>{
    total+=item.totalPrice; 
  })

  // console.warn("total",total)

  const[userLToken,setUserLToken]=useState()

  const[fresh,refresh]=useState(1);

  console.warn("itemList",itemsList);

  let cart=[];



  useEffect(()=>{
    (async()=>{
      const token=await getToken() //getting token from storage
      setUserLToken(token) //store token in local storage
    })
    
    ()
   }
  )
  
  let res=useGetAllCartItemsQuery(userLToken,
    { refetchOnMountOrArgChange: true }
    )

    if(res.isLoading===false){
        const data=res.data;
        data.forEach(element => {
            const cartItemUuid=element.uuid;
            const quantity=element.quantity;
            const name=element.product.name;
            const image=element.product.image;
            const uuid=element.product.uuid;
            const price=element.product.price;
            cart.unshift({"name":name,"image":image,"uuid":uuid,"price":price,"quantity":quantity,"cartItemUuid":cartItemUuid})
          });
      }
  // const token =  ConstantId.accessToken ;

  // console.warn(cart)
  
  // console.log("cart",userLToken)
  const removeFromCart=(cartItemid)=>{
     const remove={
      id:cartItemid,
      token:userLToken}
    cartQueryItems(remove);
    console.warn(remove.id);
    console.warn(remove.token);
  }

const [cartQueryItems]=useDeleteCartItemsMutation();

  return (
    <SafeAreaView>
      <Text>cart container</Text>
      {/* <View>
        {cart.map((item)=>{
            return <CartItem key={item.uuid} {...item}/>
        })}
      </View>
      {/* <Text>Total Amount: {total}</Text> */}
      {/* <Button title="clear" onPress={()=>dispatch(clearCart())}> */} 

      {/* </Button> */}
      <FlatList
        data={cart}
        // keyExtractor={item => item.item.uuid}
        renderItem={(item)=>{ 
            
          return(
            <View style={styles.container}>
            <View>
            <Image source={{uri:item.item.image}} style={styles.img}/>
            </View>
            <View>
            <Text>{item.item.name}</Text>
            <Text>MRP:{item.item.price}</Text>
            <Text>Quantity:{item.item.quantity}</Text>
            <Text>cartItemUuid:{item.item.cartItemUuid}</Text>
            <Button style={styles.removeFromCart} title="Remove" onPress={()=>{removeFromCart(item.item.cartItemUuid)}}></Button>
            {/* ()=>{dispatch(cartActions.removeFromCart(item.item.uuid))} */}
            </View>
            </View>

          );



        }
        }
      />        
                <Text>Total amount:{total}</Text>
                <Button title="Place Order"></Button>

    </SafeAreaView>
  )
}

export default CartContainer;

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginTop:20,
  },
  img:{
      width:100,
      height:100,
      marginRight:20
  },
  remove:{
      width:100,
      height:80,
      
    }

})