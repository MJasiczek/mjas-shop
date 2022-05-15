import axios from "axios";

import { CATEGORY_LIST_SEARCH_REQUEST, CATEGORY_LIST_SEARCH_SUCCESS, CREATE_COFFEE_REQUEST, CREATE_COFFEE_SUCCESS, DELETE_COFFEE_FAIL, DELETE_COFFEE_REQUEST, DELETE_COFFEE_SUCCESS, LIST_ALL_CATEGORY_FAIL, LIST_ALL_CATEGORY_REQUEST, LIST_ALL_CATEGORY_SUCCESS, LIST_ALL_COFFEES_FAIL, LIST_ALL_COFFEES_REQUEST, LIST_ALL_COFFEES_SUCCESS, COFFEE_LIST_FAIL, COFFEE_LIST_REQUEST, COFFEE_LIST_SEARCH_FAIL, COFFEE_LIST_SEARCH_REQUEST, COFFEE_LIST_SEARCH_SUCCESS, COFFEE_LIST_SORT_FAIL, COFFEE_LIST_SORT_HIGH, COFFEE_LIST_SORT_LOW, COFFEE_LIST_SORT_NEW, COFFEE_LIST_SORT_REQUEST, COFFEE_LIST_SORT_SUCCESS, COFFEE_LIST_SUCCESS, COFFEE_WINDOW_FAIL, COFFEE_WINDOW_REQUEST, COFFEE_WINDOW_SUCCESS, UPDATE_COFFEE_FAIL, UPDATE_COFFEE_REQUEST, UPDATE_COFFEE_SUCCESS, COFFEE_LIST_SORT_OLD } from "../constants/coffeeConstants"
import { LIST_ALL_ADMIN_COFFEES_FAIL, LIST_ALL_ADMIN_COFFEES_REQUEST, LIST_ALL_ADMIN_COFFEES_SUCCESS, USER_PROFILE_UPDATE_FAIL } from "../constants/userConstants";

export const listCoffees = () => async (dispatch)=>{
    dispatch({
        type:  LIST_ALL_COFFEES_REQUEST
    });
    try {
       const coffees = await fetch(`/coffees`).then( (response)=>{return response.json()});
        //const coffees = await axios.get(`/get/coffees`);

       dispatch({type:LIST_ALL_COFFEES_SUCCESS, payload: coffees})
    } catch (err) {
        dispatch({type:LIST_ALL_COFFEES_FAIL, payload: err.message})
    }
};

export const listAllCategory = () => async (dispatch)=>{
  dispatch({
      type:  LIST_ALL_CATEGORY_REQUEST
  });
  try {
     const allCoffees =  await axios.get(`/coffees/`,{

     });
     
      //const coffees = await axios.get(`/get/coffees`);
      var coffees=allCoffees.data;
      var items = [];
      coffees.forEach(e => {
        items.push(e.category);
      });;
      var categories =  [...new Set(items)]
     
    
     dispatch({type:LIST_ALL_CATEGORY_SUCCESS, payload: categories})
  } catch (error) {
      dispatch({type:LIST_ALL_CATEGORY_FAIL, payload: error.message})
  }
};
export const searchCategoryAction =(categorySearch)=>async(dispatch)=>{
  try {
    dispatch({ type: CATEGORY_LIST_SEARCH_REQUEST});
    
     const {data} = await axios.get(`/coffees/search`, {
      params: { category: `${categorySearch}` },
    });

    dispatch({ type: CATEGORY_LIST_SEARCH_SUCCESS, payload:data.coffees });
    
  } catch (error) {
    console.log(error);
        dispatch({ type:COFFEE_LIST_SEARCH_FAIL });

  }
}
export const searchCoffeeAction = (search) => async (dispatch) => {
  try {
    dispatch({ type: COFFEE_LIST_SEARCH_REQUEST});
   
     const {data} = await axios.get(`/coffees/search`, {
      params: { search: `${search}` },
    });

    dispatch({ type: COFFEE_LIST_SEARCH_SUCCESS, payload:data.coffees });
    
  } catch (error) {
    console.log(error);
        dispatch({ type:COFFEE_LIST_SEARCH_FAIL });

  }
};
export const sortCoffees = (rule) => async (dispatch) => {
  try {
    dispatch({ type: COFFEE_LIST_SORT_REQUEST});
    
    if(rule=="all"){
    
    const coffees = await fetch(`/coffees`).then( (response)=>{return response.json()});
   

   dispatch({type:LIST_ALL_COFFEES_SUCCESS, payload: coffees})
  } else if (rule=='low'){
    dispatch({type: COFFEE_LIST_SORT_LOW, payload:'priceLOW'})
  }
  else if(rule=='high'){
    dispatch({type:COFFEE_LIST_SORT_HIGH, payload:'priceHIGH'})
  }else if(rule=='new'){
    dispatch({type:COFFEE_LIST_SORT_NEW, payload:'new'})
  }else if(rule=='old'){
    dispatch({type:COFFEE_LIST_SORT_OLD, payload:'old'})
  }

   
  } catch (error) {
    console.log(error);
        dispatch({ type:COFFEE_LIST_SORT_FAIL });

  }
}

export const coffeeWindow = (coffeeId)=> async(dispatch)=>{
    dispatch({
        type: COFFEE_WINDOW_REQUEST,
        payload: coffeeId
    });
    try {
        const oneCoffee = await  fetch(`/coffees/${coffeeId}`).then( (response)=>{return response.json()});
        dispatch({
            type: COFFEE_WINDOW_SUCCESS,
            payload: oneCoffee
        });
    } catch (error) {
        dispatch({
            type: COFFEE_WINDOW_FAIL,
            payload: error.response && error.response.data.message? error.response.data.message : error.message
        });
    }
}
export const coffeeCreate=()=>async(dispatch,getState)=>{
    dispatch({ type: CREATE_COFFEE_REQUEST });
    const {
      user: { profile },
    } = getState();
    try {
      const { data } = await axios.post(`/coffees/create`,{}, {
        headers: { Authorization: `Bearer ${profile.token}` },
       
      });
      dispatch({ type:CREATE_COFFEE_SUCCESS, payload: data.coffee });
      
  
      
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_PROFILE_UPDATE_FAIL, payload: message });
    }
  
  }
export const updateCurrentCoffee=(coffee)=>async(dispatch,getState)=>{
    dispatch({ type: UPDATE_COFFEE_REQUEST, payload: coffee });
    const {
      user: { profile },
    } = getState();
    try {
      const { data } = await axios.put(`/coffees/update/${coffee._id}`, coffee, {
        headers: { Authorization: `Bearer ${profile.token}` },
      });
      dispatch({ type: UPDATE_COFFEE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: UPDATE_COFFEE_FAIL, error: message });
    }

}

export const coffeeDelete=(ID)=>async(dispatch, getState)=>{
    dispatch({ type: DELETE_COFFEE_REQUEST, payload: ID });
    const {
      user: { profile },
    } = getState();
    try {
        const { data } = await axios.delete(`/coffees/delete/${ID}`, {
          headers: { Authorization: `Bearer ${profile.token}` },
        });
        dispatch({ type: DELETE_COFFEE_SUCCESS});
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: DELETE_COFFEE_FAIL, error: message });
      }
}

export const adminaAllListCoffees = ()=>async(dispatch,getState)=>{
  dispatch({type: LIST_ALL_ADMIN_COFFEES_REQUEST});
  const {
    user: { profile },
  } = getState();
  try {
    const coffees = await fetch(`/coffees`).then( (response)=>{return response.json()});
    /*headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    });*/
    dispatch({ type: LIST_ALL_ADMIN_COFFEES_SUCCESS, payload: coffees });
  } catch (error) {
    const message = error.message;
    dispatch({ type:LIST_ALL_ADMIN_COFFEES_FAIL, payload: message });
  }
}
 