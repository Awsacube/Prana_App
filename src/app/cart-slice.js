import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        itemsList:[],
        totalQuantity:0,
        totalCartPrice:0
    },
    reducers:{
        addToCart(state,action){
            const newItem=action.payload;
            const existingItem=state.itemsList.find((item)=>item.uuid === newItem.uuid)   
            if(existingItem){
                existingItem.quantity=newItem.quantity;
                existingItem.totalPrice+=newItem.price;
            }
            else {
                state.itemsList.push({
                uuid:newItem.uuid,
                price:newItem.price,
                quantity:newItem.quantity,
                totalPrice:newItem.price*newItem.quantity,
                name:newItem.name
                })
            state.totalQuantity++;
            }
            console.warn("Added",state.itemsList);
        },
        removeFromCart(state,action){
                const uuid=action.payload;
                state.itemsList=state.itemsList.filter((item)=>item.uuid!==uuid)
                console.warn("Removed",state.itemsList);
        }
    }
})


export const cartActions=cartSlice.actions;
export default cartSlice;