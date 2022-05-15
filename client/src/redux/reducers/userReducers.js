import { SET_USER,LOGOUT, SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAIL, ADMIN_SEARCH_CONTACT_SUCCESS,USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_PROFILE_RESET, LIST_ALL_USERS_SUCCESS, LIST_ALL_USERS_REQUEST, LIST_ALL_USERS_FAIL, LIST_ALL_USERS_RESET, DELETE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_RESET, DELETE_USER_REQUEST, LIST_ALL_CONTACT_MESSAGES_REQUEST, LIST_ALL_CONTACT_MESSAGES_FAIL, LIST_ALL_CONTACT_MESSAGES_RESET, LIST_ALL_CONTACT_MESSAGES_SUCCESS, DELETE_MESSAGE_SUCCESS, DELETE_MESSAGE_FAIL, DELETE_MESSAGE_RESET, DELETE_MESSAGE_REQUEST, MESSAGE_WINDOW_REQUEST, MESSAGE_WINDOW_SUCCESS, MESSAGE_WINDOW_FAIL, MESSAGE_WINDOW_RESET, ADMIN_SEARCH_USERS_SUCCESS, CONTACT_LIST_SORT_LAST, CONTACT_LIST_SORT_NEW, SET_SHIPPING_PRICE_SUCCESS, SET_SHIPPING_PRICE_FAIL, USER_PROFILE_UPDATE_FAIL } from "../constants/userConstants";

export const userStateReducer = (state={profile:null}, action)=>{
    switch(action.type){
     case SIGNIN_REQUEST:
           
     case SIGNIN_SUCCESS:

            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            return { profile: JSON.parse(localStorage.getItem('profile'))};

     case SIGNIN_FAIL:
             return {profile:null, error:action.payload};
                
       case REGISTER_REQUEST:
           
     case REGISTER_SUCCESS:
      //return {profile:action.payload}
      localStorage.setItem('profile', JSON.stringify({...action.payload}))
      return {  profile:action.payload};

     case REGISTER_FAIL:
             return {profile:null, profile:action.payload};
                
        
     case SET_USER:
            return{...state, user: action.payload};
            
       case USER_UPDATE_PROFILE_RESET:
              return {};
        
    /*case USER_UPDATE_REQUEST:
           return{loading:true}
       case USER_UPDATE_SUCCESS:
              localStorage.setItem('profile', JSON.stringify({...action.payload}))
            
           return{loading:false, success:true, profile: JSON.parse(localStorage.getItem('profile'))}
       case USER_UPDATE_FAIL:
           return{loading:false, error: action.payload}*/


     case LOGOUT:
                localStorage.clear();
               // return{...state, user:null, error:null}
               return{}
            
        default:
            return state;
    }
}

export const userAdminListReducer = (state = { users: [] }, action) => {
       switch (action.type) {
         case LIST_ALL_USERS_REQUEST:
           return { loading: true };
         case LIST_ALL_USERS_SUCCESS:
           return { loading: false, users: action.payload };
         case LIST_ALL_USERS_FAIL:
           return { loading: false, error: action.payload };
           case LIST_ALL_USERS_RESET:
             return{}
             case ADMIN_SEARCH_USERS_SUCCESS:
              return { loading: false, users: action.payload };
         default:
           return state;
       }
     };
   
     export const userAdminDeleteReducer = (state = {}, action) => {
       switch (action.type) {
         case DELETE_USER_REQUEST:
           return { loading: true };
         case DELETE_USER_SUCCESS:
           return { loading: false, success:true};
         case DELETE_USER_FAIL:
           return { loading: false, error: action.payload };
           case DELETE_USER_RESET:
                  return{}
       
         default:
           return state;
       } 
     };

     export const userAdminListMessagesReducer = (state={messagesArray:[]}, action)=>{
      switch (action.type) {
        case LIST_ALL_CONTACT_MESSAGES_REQUEST:
          return { loading: true };
        case  LIST_ALL_CONTACT_MESSAGES_SUCCESS:
          return { loading: false, messagesArray:action.payload};
        case  LIST_ALL_CONTACT_MESSAGES_FAIL:
          return { loading: false, error: action.payload };
          case ADMIN_SEARCH_CONTACT_SUCCESS:
            return { loading: false, messagesArray:action.payload};

          case LIST_ALL_CONTACT_MESSAGES_RESET:
                 return{}
              case CONTACT_LIST_SORT_NEW:
                const sortingNEW=(x,y)=>{
                  if(x.createdAt>y.createdAt){
                    return -1;
                  }
                    if(x.createdAt<y.createdAt){
                      return 1;
                    }
                    return 0;
                 }
                 return{loading:false, messagesArray: state.messagesArray.sort(sortingNEW) }

              case CONTACT_LIST_SORT_LAST:
                const sortingLAST=(x,y)=>{
                  if(x.createdAt>y.createdAt){
                    return 1;
                  }
                    if(x.createdAt<y.createdAt){
                      return -1;
                    }
                    return 0;
                 }
                 return{loading:false, messagesArray: state.messagesArray.sort(sortingLAST) }

        default:
          return state;
      } 
   
     }
     export const userAdminDeleteMessagesReducer = (state={}, action)=>{
      switch (action.type) {
        case DELETE_MESSAGE_REQUEST:
          return { loading: true };
        case  DELETE_MESSAGE_SUCCESS:
          return { loading: false, refresh:true};
        case  DELETE_MESSAGE_FAIL:
          return { loading: false, error: action.payload };
          case DELETE_MESSAGE_RESET:
                 return{}
      
        default:
          return state;
      } 
   
     }
     export const messageWindowReducer = (state={message:{}}, action)=>{
      switch(action.type){
       case MESSAGE_WINDOW_REQUEST:
              return { loading: true};
       case MESSAGE_WINDOW_SUCCESS:
              return {  loading: false, message: action.payload};
  
       case MESSAGE_WINDOW_FAIL:
               return { loading: true, error:action.payload};
               case MESSAGE_WINDOW_RESET:
                return {};
              
          default:
              return state;
      }
  }
      