import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Reducer/CartReducer";
import ProductReducer from "./Reducer/ProductReducer";

export default configureStore({
    reducer: {
        cart: CartReducer,
        product: ProductReducer
    }
})