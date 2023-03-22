import { createSlice } from "@reduxjs/toolkit"
import { getToken } from '../services/AsyncStorageService'

const locationSlice = createSlice({
    name: 'location',
    initialState: {latlong:false,skip:true,city:false,postalCode:false},
    reducers: {
        setlocation: (state, action) => {
            console.log("locationpayload",action.payload);
            state.latlong={ latitude: action.payload.coords.latitude, longitude: action.payload.coords.longitude }
            console.log("locallatlong",state.latlong)
        },
        setSkip:(state,action)=>{
            console.log("skippayload",action.payload)
            state.skip=action.payload
            console.log("skipstate",state.skip)
        },
        setCity:(state,action)=>{
            console.log("citypayload",action.payload)
            state.city=action.payload
            console.log("citystate",state.city)
        },
        setPostalCode:(state,action)=>{
            console.log("postalload",action.payload)
            state.postalCode=action.payload
            console.log("postalstate",state.postalCode)
        }
    },
})

export const { setlocation,setSkip,setPostalCode,setCity } = locationSlice.actions

export default locationSlice

// export const savelocation = (state) => state.location.setlocation