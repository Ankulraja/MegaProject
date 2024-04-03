import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState ={
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : null,

}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
         setTotalItems(state,value){
            state.totalItems = value.payload
         },
        //  add to cart
        // remove from cart
        // reset cart
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          }
    }
})

export const {setTotalItems,resetCart} = cartSlice.actions;
export default cartSlice.reducer;