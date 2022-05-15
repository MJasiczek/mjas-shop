import { CATEGORY_LIST_SEARCH_SUCCESS, CREATE_COFFEE_FAIL, CREATE_COFFEE_REQUEST, CREATE_COFFEE_RESET, CREATE_COFFEE_SUCCESS, DELETE_COFFEE_FAIL, DELETE_COFFEE_REQUEST, DELETE_COFFEE_RESET, DELETE_COFFEE_SUCCESS, LIST_ALL_CATEGORY_FAIL, LIST_ALL_CATEGORY_REQUEST, LIST_ALL_CATEGORY_SUCCESS, LIST_ALL_COFFEES_FAIL, LIST_ALL_COFFEES_REQUEST, LIST_ALL_COFFEES_SUCCESS, COFFEE_LIST_SEARCH_SUCCESS, COFFEE_LIST_SORT_HIGH, COFFEE_LIST_SORT_LOW, COFFEE_LIST_SORT_NEW, COFFEE_LIST_SORT_SUCCESS, COFFEE_LIST_SUCCESS, COFFEE_WINDOW_FAIL, COFFEE_WINDOW_REQUEST, COFFEE_WINDOW_RESET, COFFEE_WINDOW_SUCCESS, LIST_ALL_ADMIN_COFFEES_FAIL, LIST_ALL_ADMIN_COFFEES_SUCCESS, LIST_ALL_ADMIN_COFFEES_REQUEST, LIST_ALL_ADMIN_COFFEES_RESET, COFFEE_LIST_SORT_OLD, UPDATE_COFFEE_FAIL } from "../constants/coffeeConstants";
import { ADMIN_SEARCH_ALL_COFFEES, ADMIN_SEARCH_SUCCESS } from "../constants/userConstants";

export const coffeeListReducer = (state={coffees:[], loading:true}, action)=>{
    switch(action.type){
     case LIST_ALL_COFFEES_REQUEST:
            return {loading: true};
     case LIST_ALL_COFFEES_SUCCESS:
            return {loading: false, coffees: action.payload};

     case LIST_ALL_COFFEES_FAIL:
             return {loading: false, error:action.payload};
                
        case COFFEE_LIST_SEARCH_SUCCESS:
          return {loading: false, coffees: action.payload} 

      case CATEGORY_LIST_SEARCH_SUCCESS:
        return {loading: false, coffees: action.payload} 
        case COFFEE_LIST_SORT_SUCCESS:
          return {loading: false, coffees: action.payload} 

          case COFFEE_LIST_SORT_LOW:{
           const sortingLOW=(x,y)=>{
            if(x.price>y.price){
              return 1;
            }
              if(x.price<y.price){
                return -1;
              }
              return 0;
           }
           /*var arr=[];
           state.coffees.forEach((e)=>{
             arr.push(e.price);
           })

           const quickSort=(arr)=>{
             if(arr.length<=1){
               return arr;
             }
             var pivot = arr[0];
             var left = [];
             var right = [];
             arr.forEach((e)=>{
               if(e<pivot){
                 left.push(e)
               }else{
                 right.push(e)
               }
             })
             return quickSort(left).concat(pivot, quickSort(right));
           }
           var sorted = quickSort(arr)
           console.log(sorted)*/
            return{loading:false, coffees: state.coffees.sort(sortingLOW) /*sorted*/}
          }
          case COFFEE_LIST_SORT_NEW:{
            const sortingNEW=(x,y)=>{
              if(x._id>y._id){
                return -1;
              }
                if(x._id<y._id){
                  return 1;
                }
                return 0;
             }
            
            return{loading:false, coffees: state.coffees.sort(sortingNEW) }
          }
          case COFFEE_LIST_SORT_OLD:{
            const sortingNEW=(x,y)=>{
              if(x._id>y._id){
                return 1;
              }
                if(x._id<y._id){
                  return -1;
                }
                return 0;
             }
             return{loading:false, coffees: state.coffees.sort(sortingNEW) }

          }
          case COFFEE_LIST_SORT_HIGH:{
            const sortingHIGH=(x,y)=>{
             if(x.price>y.price){
               return -1;
             }
               if(x.price<y.price){
                 return 1;
               }
               return 0;
            }
             return{loading:false, coffees: state.coffees.sort(sortingHIGH)}
           }
        default:
            return state;
    }
}

export const categoryListReducer = (state={categories:[], loading:true}, action)=>{
  switch(action.type){
   case LIST_ALL_CATEGORY_REQUEST:
          return {loading: true};
   case LIST_ALL_CATEGORY_SUCCESS:
          return {loading: false, categories: action.payload};

   case LIST_ALL_CATEGORY_FAIL:
           return {loading: false, error:action.payload};
              
      case COFFEE_LIST_SEARCH_SUCCESS:
        return {loading: false, coffees: action.payload} 
      default:
          return state;
  }
}
export const coffeeWindowReducer = (state={coffee:{}}, action)=>{
    switch(action.type){
     case COFFEE_WINDOW_REQUEST:
            return {};
     case COFFEE_WINDOW_SUCCESS:
            return { coffee: action.payload};

     case COFFEE_WINDOW_FAIL:
             return {error:action.payload};
             case COFFEE_WINDOW_RESET:
              return {};
      
        default:
            return state;
    }
}

export const coffeeAdminCreateReducer = (state = {}, action) => {
       switch (action.type) {
         case CREATE_COFFEE_REQUEST:
           return { loading: true };
         case CREATE_COFFEE_SUCCESS:
           return { loading: false, success: true, coffee: action.payload };
         case CREATE_COFFEE_FAIL:
           return { loading: false, error: action.payload };
         case CREATE_COFFEE_RESET:
           return {};
         default:
           return state;
       }
     };

     export const coffeeAdminDeleteReducer = (state={}, action)=>{
       switch (action.type) {
              case DELETE_COFFEE_REQUEST:
                return { loading: true };
              case DELETE_COFFEE_SUCCESS:
                return { loading: false, success:true};
              case DELETE_COFFEE_FAIL:
                return { loading: false, error: action.payload };
                case DELETE_COFFEE_RESET:
                       return{}
            
              default:
                return state;
            } 
     }
     export const adminAllListCoffeesRedicer = (state={coffees:[], loading:true}, action)=>{
      switch(action.type){
       case LIST_ALL_ADMIN_COFFEES_REQUEST:
              return {loading: true};
       case LIST_ALL_ADMIN_COFFEES_SUCCESS:
              return {loading: false, coffees: action.payload};
  
       case LIST_ALL_ADMIN_COFFEES_FAIL:
               return {loading: false, error:action.payload}; 

               case ADMIN_SEARCH_SUCCESS:
                 return{loading: false, coffees: action.payload};

                case  ADMIN_SEARCH_ALL_COFFEES:
                  return{loading: false, coffees: action.payload};

               default:
                return state;


            } }

    