import { ADD_TO_CART, CART_PAYMENT_DATA, CART_SHIPPING_INFO, REMOVE_FROM_CART, SET_CART } from "../constants/cartConstants"

export const addToCart = (coffeeID, pID, quantity, roast, category)=> async(dispatch, getState)=>{
    const getToCart = await  fetch(`/coffees/${coffeeID}`).then( (response)=>{return response.json()});
    dispatch({
        type: ADD_TO_CART,
        payload:{
            id:getToCart._id,
            pID:pID,
            brand_name:getToCart.brand_name,
            price:getToCart.price,
            //image:getToCart.image,
            roast:roast,
            inStock: getToCart.inStock,
            category: category,
            quantity
        }
    })
    localStorage.setItem('cartYourItems', JSON.stringify(getState().cart.cartYourItems));
}

export const removeFromCart = (pID ) => (dispatch, getState)=>{
    dispatch({
        type: REMOVE_FROM_CART,
        payload:pID
    })
    localStorage.setItem('cartYourItems', JSON.stringify(getState().cart.cartYourItems));
}

export const setCart =(cart)=>(dispatch, getState)=>{
    
    dispatch({
        type:SET_CART,
        payload:cart
    })
}

export const shippingInfo=(data)=>(dispatch)=>{
    dispatch({type: CART_SHIPPING_INFO, payload:data})
}
export const paymentData = (data)=> (dispatch)=>{
    dispatch({type: CART_PAYMENT_DATA, payload:data})
}