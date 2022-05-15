import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import reduxThunk from 'redux-thunk'
import { cartReducers } from '../redux/reducers/cartReducers';
import { messageWindowReducer, userAdminDeleteMessagesReducer, userAdminDeleteReducer, userAdminListMessagesReducer, userAdminListReducer, userAdminShippingPrice, userStateReducer } from '../redux/reducers/userReducers';
import { adminAllListCoffeesRedicer, categoryListReducer, coffeeAdminCreateReducer, coffeeAdminDeleteReducer, coffeeListReducer, coffeeWindowReducer } from '../redux/reducers/coffeeReducers';
import { acceptAdminOrderReducer, createOrderReducer, getOrderDetailsReducer, orderAdminDeleteReducer, orderAdminListReducer,  orderUserListReducer, paymentOrderReducer, takebackAdminOrderReducer, } from '../redux/reducers/orderReducer';

const initialState = {
    cart:{cartYourItems: localStorage.getItem('cartYourItems') ? JSON.parse( localStorage.getItem('cartYourItems')):[],
            shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')):{},
            paymentData: 'Stripe',
        },
    user:{profile: localStorage.getItem('profile')? JSON.parse(localStorage.getItem('profile')):[]}
};



const reducer =combineReducers({
    coffeeList: coffeeListReducer,
    categoryList: categoryListReducer,
    coffeeWindow: coffeeWindowReducer,
    //orderUserList: usersListOfOrders,
    userOrders: orderUserListReducer,
    cart: cartReducers,
    user: userStateReducer, 
    createOrder: createOrderReducer,
    createCoffee: coffeeAdminCreateReducer,
    deleteCoffee: coffeeAdminDeleteReducer,
    detailOrder: getOrderDetailsReducer,
    paymentOrder: paymentOrderReducer,
    adminListOrder:orderAdminListReducer,
    adminListUser: userAdminListReducer,
   // adminShippingPrice: userAdminShippingPrice,
    adminListMessages: userAdminListMessagesReducer,
    adminListCoffees:adminAllListCoffeesRedicer,
    deleteOrder: orderAdminDeleteReducer,
    takebackOrder: takebackAdminOrderReducer,
    deleteUser: userAdminDeleteReducer,
    deleteMessage: userAdminDeleteMessagesReducer,
    messageWindow: messageWindowReducer,
    
})




const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(applyMiddleware(reduxThunk))
const store = createStore(reducer, initialState, enhancer);

export default store;