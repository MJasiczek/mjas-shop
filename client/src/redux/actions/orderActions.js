import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ACCEPT_ORDER_FAIL, ACCEPT_ORDER_REQUEST, ACCEPT_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, LIST_ALL_ORDERS_FAIL, LIST_ALL_ORDERS_REQUEST, LIST_ALL_ORDERS_SUCCESS, LIST_ORDER_USER_FAIL, LIST_ORDER_USER_REQUEST, LIST_ORDER_USER_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_TERMS, ORDER_DELETE_TERMS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAYMENT_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS, ORDER_USER_HISTORY_LIST_FAIL, ORDER_USER_HISTORY_LIST_REQUEST, ORDER_USER_HISTORY_LIST_SUCCESS, TAKEBACK_ORDER_FAIL, TAKEBACK_ORDER_REQUEST, TAKEBACK_ORDER_SUCCESS} from "../constants/orderConstants";
import { DELETE_COFFEE_FAIL, DELETE_COFFEE_SUCCESS } from "../constants/coffeeConstants";
import {saveAs} from 'file-saver'

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
      const {
        user: { profile },
      } = getState();
     
     
      const {data} = await axios.post('/order/send', order, {
        headers: {
          Authorization: `Bearer ${profile.token}`,
        },
    })
    
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });

      
      
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const deleteTerms = (allCoffeesToDelete) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_TERMS, payload: allCoffeesToDelete });
    try {
      const {
        user: { profile },
      } = getState();
    
     
      const {data} = await axios.put('/order/deleteTerms', allCoffeesToDelete, {
        headers: {
          Authorization: `Bearer ${profile.token}`,
        },
    })
    
      dispatch({ type: ORDER_DELETE_TERMS_SUCCESS, payload: data});
      //dispatch({ type: CART_EMPTY });
      
    } catch (error) {
     
      console.log(error)
    }
  };


  export const orderDetails = (orderID)=>async(dispatch, getState)=>{
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderID });
    const{user:{profile}} = getState();

    try {
     
        const { data } = await axios.get(`/order/get/${orderID}`, {
          headers: { Authorization: `Bearer ${profile.token}` },
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
       /* .then((responseJSON)=>{
            const groups=[];
            for(const key in responseJSON){
                const group={
                    _id:key,
                    ...responseJSON[key]
                }
                groups.push(group)
                return groups;
            }
        });*/
      
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
        /* const { data } = await axios.get(`/order/${orderID}`, {
            headers: { Authorization: `Bearer ${profile.token}` },
          });
          dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });*/

    } catch (error) {
        const message = error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });

    }
  }

  export const payYourOrder = (order/*, paymentInfo*/)=>async(dispatch, getState)=>{
    dispatch({type:ORDER_PAYMENT_REQUEST, payload:{order/*, paymentInfo*/}})
    const{user:{profile}} = getState();
    const userData = order.user;

    try {
      const {paymentData} = axios.put(`/order/${order._id}/paid`, {/*paymentInfo,*/userData},{
        headers: {Authorization: `Bearer ${profile.token}`},
      }).then(()=>axios.get('/order/recipt', {params:{foo:`${order._id}`}},{responseType:'blob'})).then((res)=>{
        const pdfBlob = new Blob([res.data], {type:'application/pdf'});
        saveAs(pdfBlob, 'newFV.pdf');
      })

      dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: paymentData });

    } catch (error) {
      const message = error.message;
      dispatch({ type: ORDER_PAYMENT_FAIL, payload: message });

    
    }
  }

 
  export const userOrderList = () => async (dispatch, getState) => {
    dispatch({ type: LIST_ORDER_USER_REQUEST });
    const {
      user: { profile },
    } = getState();
    try {
      const { data } = await axios.get('/order/userOrderList', {
        headers: {
          Authorization: `Bearer ${profile.token}`,
        },
        params:{
          foo:`${profile.result._id}`
        }
      });
      dispatch({ type: LIST_ORDER_USER_SUCCESS ,payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: LIST_ORDER_USER_FAIL, payload: message });
    }
  };

  export const allListOrder = ()=>async(dispatch,getState)=>{
    dispatch({type: LIST_ALL_ORDERS_REQUEST});
    const {
      user: { profile },
    } = getState();
    try {
      const { data } = await axios.get('/order/allOrders', {
        headers: {
          Authorization: `Bearer ${profile.token}`,
        },
      });
      dispatch({ type: LIST_ALL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      const message = error.message;
      dispatch({ type: LIST_ALL_ORDERS_FAIL, payload: message });
    }
  }
  export const orderDelete=(ID)=>async(dispatch, getState)=>{
    dispatch({ type: DELETE_ORDER_REQUEST, payload: ID });
    const {
      user: { profile },
    } = getState();
    try {
        const { data } = await axios.delete(`/order/delete/${ID}`, {
          headers: { Authorization: `Bearer ${profile.token}` },
          params:{
            foo:`${profile.result._id}`
          }
        });
        dispatch({ type: DELETE_ORDER_SUCCESS});
      } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        dispatch({ type: DELETE_ORDER_FAIL, error: message });
      }
}
export const takeBackOrder=(order_id, user_id)=>async (dispatch,getState)=>{
  dispatch({ type: TAKEBACK_ORDER_REQUEST, payload: {order_id, user_id }});
  const {
    user: { profile },
  } = getState();
  try {
    const { data } = await axios.put(`/order/update/${order_id}`,user_id, {
      headers: { Authorization: `Bearer ${profile.token}` },
      params:{
        foo: user_id
      }
    });
    dispatch({ type:  TAKEBACK_ORDER_SUCCESS});
  } catch (error) {
    const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    dispatch({ type:  TAKEBACK_ORDER_FAIL, error: message });
  }

}