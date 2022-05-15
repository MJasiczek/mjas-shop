import { ACCEPT_ORDER_FAIL, ACCEPT_ORDER_REQUEST, ACCEPT_ORDER_RESET, ACCEPT_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, LIST_ALL_ORDERS_FAIL, LIST_ALL_ORDERS_REQUEST, LIST_ALL_ORDERS_RESET, LIST_ALL_ORDERS_SUCCESS, LIST_ORDER_USER_FAIL, LIST_ORDER_USER_REQUEST, LIST_ORDER_USER_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_RESET, ORDER_PAYMENT_SUCCESS, ORDER_USER_HISTORY_LIST_FAIL, ORDER_USER_HISTORY_LIST_REQUEST, ORDER_USER_HISTORY_LIST_SUCCESS, TAKEBACK_ORDER_FAIL, TAKEBACK_ORDER_REQUEST, TAKEBACK_ORDER_RESET, TAKEBACK_ORDER_SUCCESS } from "../constants/orderConstants";
import { ADMIN_SEARCH_SUCCESS_ORDERS } from "../constants/userConstants";

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
 
  export const getOrderDetailsReducer = (state={loading:true}, action)=>{
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { loading: true };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
  }
}
export const paymentOrderReducer=(state={},action)=>{
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return { loading: true };
    case ORDER_PAYMENT_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAYMENT_RESET:
      return {};
    default:
      return state;
}
}

export const orderUserListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case LIST_ORDER_USER_REQUEST:
      return { loading: true };
    case LIST_ORDER_USER_SUCCESS:
      return { loading: false, orders: action.payload };
    case LIST_ORDER_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderAdminListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case LIST_ALL_ORDERS_REQUEST:
      return { loading: true };
    case LIST_ALL_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case LIST_ALL_ORDERS_FAIL:
      return { loading: false, error: action.payload };
      case LIST_ALL_ORDERS_RESET:
        return{}
        case ADMIN_SEARCH_SUCCESS_ORDERS:
          return { loading: false, orders: action.payload };
          default:
      return state;
  }
};
export const orderAdminDeleteReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return { loading: true };
    case DELETE_ORDER_SUCCESS:
      return { loading: false, success:true};
    case DELETE_ORDER_FAIL:
      return { loading: false, error: action.payload };
      case DELETE_ORDER_RESET:
             return{}
  
    default:
      return state;
  } 
};

export const takebackAdminOrderReducer=(state={},action)=>{
  switch (action.type) {
    case TAKEBACK_ORDER_REQUEST:
      return { loading: true };
    case TAKEBACK_ORDER_SUCCESS:
      return { loading: false, success: true };
    case TAKEBACK_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case TAKEBACK_ORDER_RESET:
      return {};
    default:
      return state;
}
}