import axios from "axios";
import { LIST_ALL_ORDERS_FAIL, LIST_ALL_ORDERS_SUCCESS } from "../constants/orderConstants";
import { SET_USER,LOGOUT,SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_PROFILE_UPDATE_FAIL, USER_PERSONAL_DATA_UPDATE_REQUEST, USER_PERSONAL_DATA_UPDATE_SUCCESS, USER_PERSONAL_DATA_UPDATE_FAIL, LIST_ALL_USERS_REQUEST, LIST_ALL_USERS_SUCCESS, LIST_ALL_USERS_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL, CONTACT_MESSAGE_SENT, LIST_ALL_CONTACT_MESSAGES_REQUEST, LIST_ALL_CONTACT_MESSAGES_SUCCESS, LIST_ALL_CONTACT_MESSAGES_FAIL, DELETE_MESSAGE_REQUEST, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL, MESSAGE_WINDOW_REQUEST, MESSAGE_WINDOW_SUCCESS, MESSAGE_WINDOW_FAIL, CONTACT_RESPOND_SENT, CONTACT_RESPOND_FAIL, CONTACT_RESPOND_SUCCESS, NEW_NEWSLETTER_APPLICATION, ADMIN_SEARCH_REQUEST, ADMIN_SEARCH_SUCCESS, ADMIN_SEARCH_FAIL, LIST_ALL_ADMIN_COFFEES_SUCCESS, ADMIN_SEARCH_ALL_COFFEES, ADMIN_SEARCH_SUCCESS_ORDERS, ADMIN_SEARCH_USERS_SUCCESS, CONTACT_LIST_SORT_NEW, CONTACT_LIST_SORT_LAST, CONTACT_LIST_SORT_FAIL, ADMIN_SEARCH_CONTACT_SUCCESS, SET_SHIPPING_PRICE_SUCCESS, SET_SHIPPING_PRICE_FAIL } from "../constants/userConstants";
export const signIn = (data)=>async(dispatch, getState)=>{
    
    dispatch({
        type:SIGNIN_REQUEST,
       
    });
    try {
       
        const info = await fetch('/signin/login',{
            method:'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>{return response.json()})
        dispatch({
            type:SIGNIN_SUCCESS,
            payload:info
        })
        //localStorage.setItem('profile', JSON.stringify(getState().user.user));
    
    } catch (error) {
        dispatch({
            type:SIGNIN_FAIL,
            payload:error.message
        })
        
        
    }
}
export const register = (data)=> async(dispatch)=>{
    
    dispatch({
        type: REGISTER_REQUEST,
    });
    try{
        const regis = await fetch('/signup/register',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>{return response.json()})
        
        
        dispatch({
            type:REGISTER_SUCCESS,
           payload:regis
            
        })
        document.location.href = '/signin';
        /*dispatch({
            type:SIGNIN_SUCCESS, 
            payload:regis
        })*/
        
       // document.location.href = '/signin';
    } catch (error) {
      
    dispatch({
        type:REGISTER_FAIL,
        payload:error.message,
        
    }
    )
   // document.location.href = '/register';
    
    
}
}

export const setUser =(user)=> async(dispatch)=>{
    dispatch({
        type:SET_USER,
        payload:user
    })
}
export const signOut =()=> (dispatch)=>{
   
    document.location.href = '/signin';
    dispatch({
        type:LOGOUT,
      
    })
}

export const sendNewsletter = (news)=> async(dispatch, getState)=>{
  const { user: { profile }} = getState();
  try {
    const { data } = await axios.post(`users/newsletter/send`, news, {
      headers: { Authorization: `Bearer ${profile.token}` },
      params:{foo:`${news.adminID}`}
    });
    dispatch({ type: CONTACT_RESPOND_SUCCESS});
  } catch (error) {
    dispatch({ type: CONTACT_RESPOND_FAIL});
  }
}
export const updateUserProfile = (user)=> async(dispatch, getState)=>{
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST, payload: user });
  const {
    user: { profile },
  } = getState();
  try {
    const { data } = await axios.put(`/users/profile/info`, user, {
      headers: { Authorization: `Bearer ${profile.token}` },
      params:{
        foo:`${profile.result._id}`
      }
    });
    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('profile', JSON.stringify(data));
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_PROFILE_UPDATE_FAIL, payload: message });
  }
}
export const personalDataUpdate = (user)=> async(dispatch, getState)=>{
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST, payload: user });
  const {
    user: { profile },
  } = getState();
  try {
    const { data } = await axios.put(`/users/profile/personal`, user, {
      headers: { Authorization: `Bearer ${profile.token}` },
      params:{
        foo:`${profile.result._id}`
      }
    });
    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('profile', JSON.stringify(data));
   
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_PROFILE_UPDATE_FAIL, payload: message });
  }
}
export const getAllUsers =()=>async(dispatch,getState)=>{
 
  dispatch({type: LIST_ALL_USERS_REQUEST});
    const {
      user: { profile },
    } = getState();
    try {
      const { data } = await axios.get('/users/allUsers', {
        headers: {
          Authorization: `Bearer ${profile.token}`,
        },
      });
      dispatch({ type: LIST_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
      const message = error.message;
      dispatch({ type: LIST_ALL_USERS_FAIL, payload: message });
    }
}
export const userDelete=(ID)=>async(dispatch, getState)=>{
  dispatch({ type: DELETE_USER_REQUEST, payload: ID });
  const {
    user: { profile },
  } = getState();
  try {
      const { data } = await axios.delete(`/users/delete/${ID}`, {
        headers: { Authorization: `Bearer ${profile.token}` ,
      } ,
      params:{
        foo:`${ID}`,
      }});
      dispatch({ type: DELETE_USER_SUCCESS, payload:data});
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({ type: DELETE_USER_FAIL, error: message });
    }
}
export const sendMessage = (contactMessage)=>async(dispatch)=>{
  dispatch({ type: CONTACT_MESSAGE_SENT, payload: contactMessage });
    try {
      const { data } = await axios.post(`users/contact/send`, contactMessage, {
      
      });
     
    } catch (error) {
     
    }

}
export const allListMessages = ()=>async(dispatch, getState)=>{
  dispatch({ type: LIST_ALL_CONTACT_MESSAGES_REQUEST });
  const{user:{profile}} = getState();
  try {
    const { data } = await axios.get(`users/contact/messages`, {
      headers: { Authorization: `Bearer ${profile.token}` },

    });
    dispatch({ type: LIST_ALL_CONTACT_MESSAGES_SUCCESS, payload: data.messagesArray});

  } catch (error) {
    dispatch({ type: LIST_ALL_CONTACT_MESSAGES_FAIL, error: error.message });

  }
}

export const messageDelete =(ID)=>async(dispatch, getState)=>{
  
    dispatch({ type: DELETE_MESSAGE_REQUEST, payload: ID });
    const {
      user: { profile },
    } = getState();
    try {
        const { data } = await axios.delete(`/users/messages/delete/${ID}`, {
          headers: { Authorization: `Bearer ${profile.token}` },
          params:{
            foo:`${profile.result._id}`
          }
        });
        dispatch({ type: DELETE_MESSAGE_SUCCESS, refresh:true});
       
      } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
        dispatch({ type: DELETE_MESSAGE_FAIL, error: message });
      }

}
export const messageWindow = (messageID)=> async(dispatch, getState)=>{
  const {
    user: { profile },
  } = getState();
  dispatch({
      type: MESSAGE_WINDOW_REQUEST,
      payload: messageID
  });
  try {
      const oneMessage = await axios.get(`/users/get/message/${messageID}`, {
        headers: { Authorization: `Bearer ${profile.token}` },
        
      });
      dispatch({
          type: MESSAGE_WINDOW_SUCCESS,
          payload: oneMessage.data
      });
  } catch (error) {
      dispatch({
          type: MESSAGE_WINDOW_FAIL,
          payload: error.response && error.response.data.message? error.response.data.message : error.message
      });
  }
}

export const sendRespond = (yourRespond) =>async(dispatch, getState)=>{
  dispatch({ type: CONTACT_RESPOND_SENT, payload: yourRespond });
  const {
    user: { profile },
  } = getState();
  try {
    const { data } = await axios.post(`users/contact/respond`, yourRespond, {
      headers: { Authorization: `Bearer ${profile.token}` },
    });
    dispatch({ type: CONTACT_RESPOND_SUCCESS});
  } catch (error) {
    dispatch({ type: CONTACT_RESPOND_FAIL});
  }
}


export const adminSearch  = (search) => async (dispatch, getState) => { 

  dispatch({type: ADMIN_SEARCH_REQUEST});
  const {user:{profile}} = getState();

  if(search.where=='coffees'){
    if(search.searchValue=='name'){
      try {
        const {data} = await axios.get(`/users/admin/coffees/search`, {
          headers: { Authorization: `Bearer ${profile.token}` },
          params:{
            brand_name:`${search.searchData}`,
            where: `${search.where}`
          }
        })
   
       dispatch({ type: ADMIN_SEARCH_SUCCESS, payload:data.coffees });
      
     } catch (error) {
       console.log(error);
           dispatch({ type:ADMIN_SEARCH_FAIL });
   
     }
    }
    else{
      try {
        const coffees = await axios.get(`/coffees`, {
        headers: {
            Authorization: `Bearer ${profile.token}`,
          },
        });
        dispatch({ type: ADMIN_SEARCH_ALL_COFFEES, payload: coffees.data });
      
     } catch (error) {
       console.log(error);
           dispatch({ type:ADMIN_SEARCH_FAIL });
   
     }
    }
  
    }
    if(search.where=='orders'){
      if(search.searchValue=='email'){
        try {
          const {data} = await axios.get(`/users/admin/orders/search`, {
            headers: { Authorization: `Bearer ${profile.token}` },
            params:{
              email:`${search.searchData}`,
              where: `${search.where}`
            }
          })
         dispatch({ type: ADMIN_SEARCH_SUCCESS_ORDERS, payload:data.data });
        
       } catch (error) {
         console.log(error);
             dispatch({ type:ADMIN_SEARCH_FAIL });
     
       }
      }
      else{

      
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
    }
    if(search.where=='users'){
     
       if(search.searchValue=='email'){
        try {
          const {data} = await axios.get(`/users/admin/user/search`, {
            headers: { Authorization: `Bearer ${profile.token}` },
            params:{
              email:`${search.searchData}`,
              where: `${search.where}`
            }
          })
     
         dispatch({ type: ADMIN_SEARCH_USERS_SUCCESS, payload:data.data });
        
       } catch (error) {
         console.log(error);
             dispatch({ type:ADMIN_SEARCH_FAIL });
     
       }
      }
      if(search.searchValue=='all'){
        try {
          const { data } = await axios.get('/users/allUsers', {
            headers: {
              Authorization: `Bearer ${profile.token}`,
            },
          });
          dispatch({ type: LIST_ALL_USERS_SUCCESS, payload: data });
        } catch (error) {
          const message = error.message;
          dispatch({ type: LIST_ALL_USERS_FAIL, payload: message });
        }
      }
    }
    if(search.where=='contact'){
     
      if(search.searchValue=='email'){
       try {
         const {data} = await axios.get(`/users/admin/contact/search`, {
           headers: { Authorization: `Bearer ${profile.token}` },
           params:{
             email:`${search.searchData}`,
             where: `${search.where}`
           }
         })
    
        dispatch({ type: ADMIN_SEARCH_CONTACT_SUCCESS, payload:data.messagesArray });
       
      } catch (error) {
        console.log(error);
            dispatch({ type:ADMIN_SEARCH_FAIL });
    
      }
     }
     if(search.searchValue=='all'){
       try {
        const { data } = await axios.get(`users/contact/messages`, {
          headers: { Authorization: `Bearer ${profile.token}` },
    
        });
        dispatch({ type: LIST_ALL_CONTACT_MESSAGES_SUCCESS, payload: data.messagesArray});
       } catch (error) {
         const message = error.message;
         dispatch({ type: LIST_ALL_CONTACT_MESSAGES_FAIL, payload: message });
       }
     }
   }
}
export const shippingPriceAction =(price)=>async(dispatch,getState)=>{
  
  try {
    dispatch({ type: SET_SHIPPING_PRICE_SUCCESS, payload: price});
   } catch (error) {
     const message = error.message;
     dispatch({ type: SET_SHIPPING_PRICE_FAIL, payload: message });
   }

}
export const sortAdmin=(rule)=>async(dispatch, getState)=>{
  const {user:{profile}} = getState();
  try {
   
    if(rule=="all"){
   
    const { data } = await axios.get(`users/contact/messages`, {
      headers: { Authorization: `Bearer ${profile.token}` },

    });
    dispatch({ type: LIST_ALL_CONTACT_MESSAGES_SUCCESS, payload: data.messagesArray});

  
  }  if(rule=='new'){
    dispatch({type:CONTACT_LIST_SORT_NEW, payload:'new'})
  }
    if(rule=='last'){
    dispatch({type:CONTACT_LIST_SORT_LAST, payload:'last'})
  }

   
  } catch (error) {
    console.log(error);
        dispatch({ type:CONTACT_LIST_SORT_FAIL });

  }
}


