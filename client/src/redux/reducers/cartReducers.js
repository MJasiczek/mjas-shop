import { ADD_TO_CART, CART_EMPTY, CART_PAYMENT_DATA, CART_SHIPPING_INFO, REMOVE_FROM_CART, SET_CART } from "../constants/cartConstants";

export const cartReducers = (state={cartYourItems:[]}, action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartYourItems.find((x)=>x.id==item.id && x.roast==item.roast);
            if(existItem){
                return{
                    ...state,
                    cartYourItems: state.cartYourItems.map((el)=>el.id===existItem.id &&el.roast===existItem.roast? item:el)
                }
            }else{
                return{
                    ...state,
                    cartYourItems: [...state.cartYourItems, item],
                    
                }               
            }

        case REMOVE_FROM_CART:
            return{
                ...state,
                cartYourItems: state.cartYourItems.filter((el)=>el.pID  !== action.payload)
            };

         case SET_CART:
            return{
                ...state,
                cartYourItems: [action.payload]
            };


       

        case CART_SHIPPING_INFO:
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
            return{
                ...state,
                    shippingInfo: action.payload
            };

        case CART_PAYMENT_DATA:
            return{
                ...state,
                    paymentData: action.payload
            };
        case CART_EMPTY:
            localStorage.removeItem('cartYourItems');
            return{
                ...state,
                cartYourItems:[]
            };
        default:
            return state;
}
}