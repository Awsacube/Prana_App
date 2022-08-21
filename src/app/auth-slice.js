import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoading:true,
        user:null,
        token:null

        //based upon the user token show app stack or auth stack if it's null show login screen if it's filled show app
    },
    reducers:{
        login:(state,payload)=>{
            // const { user, accessToken }= action.payload
            // state.user=user,
            // state.token=accessToken

        },
        logOut:(state)=>{
            state.user=null,
            state.token=null,
            state.isLoading=false
        }
    }
})

export const {setCredentials,logOut}=authSlice.actions

export default authSlice.reducer

export const selectCurrentUser=(state)=>{state.auth.user}
export const selectCurrentToken=(state)=>{state.auth.token}