import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers:{
        addProduct:(state,action)=>{
            const incoming = action.payload;
            const existingIndex = state.products.findIndex(
                (product) =>
                    product._id === incoming._id &&
                    product.color === incoming.color &&
                    product.size === incoming.size
            );
            if (existingIndex >= 0) {
                state.products[existingIndex].quantity += incoming.quantity;
            } else {
                state.products.push(incoming);
            }
            state.quantity += incoming.quantity;
            state.total += incoming.price * incoming.quantity;
        },
        updateProductQuantity:(state,action)=>{
            const { productId, color, size, delta } = action.payload;
            const index = state.products.findIndex(
                (product) =>
                    product._id === productId &&
                    product.color === color &&
                    product.size === size
            );
            if (index === -1) return;
            const product = state.products[index];
            const nextQuantity = product.quantity + delta;
            if (nextQuantity <= 0) {
                state.quantity -= product.quantity;
                state.total -= product.price * product.quantity;
                state.products.splice(index, 1);
            } else {
                product.quantity = nextQuantity;
                state.quantity += delta;
                state.total += product.price * delta;
            }
        },
        removeProduct:(state,action)=>{
            const { productId, color, size } = action.payload;
            const index = state.products.findIndex(
                (product) =>
                    product._id === productId &&
                    product.color === color &&
                    product.size === size
            );
            if (index === -1) return;
            const product = state.products[index];
            state.quantity -= product.quantity;
            state.total -= product.price * product.quantity;
            state.products.splice(index, 1);
        },
    },
});

export const { addProduct, updateProductQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
