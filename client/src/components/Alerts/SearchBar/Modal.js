import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import { searchCoffeeAction } from '../../../redux/actions/coffeeActions';
import { personalDataUpdate } from '../../../redux/actions/userActions'
import modalModule from './Modal.module.css'
function useQuery(){
    return new URLSearchParams(useLocation().search);
}

export const Modal_search = (props) => {
  
    
    const query = useQuery();
    const history = useHistory();
    const searchQuery = query.get('searchQuery')
    const page = query.get('page') || 1;
   
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    //const [name, setSearchName] = useState("")
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    const submitSearchHandler =(e)=>{
       e.preventDefault();
        if(search.trim()){
            dispatch(searchCoffeeAction(search));
           
            history.push(`/shop/search?search=${search || 'none'}`)
        }else{
            history.push('/shop')
        }
    }
    /*const submitSearch = (e)=>{
        e.preventDefault();
        props.history.push(`/shop/search/${searchName}`)
    }*/
   
    return (
        <div className={modalModule.modal_personal_data}>
            <form className={modalModule.modal_personal_form} >
                <div>
                    <h1>Search for coffees:</h1>
                </div>
                <div>
                    <label htmlFor='query'>Search</label>
                    <input type='text'  placeholder='Search here...'  onChange={(e)=>setSearch(e.target.value)} ></input>
                    

                </div>
                
                <div>
                    <label />
                </div>
            </form>
            <div className={modalModule.modal_personal_controls}>
            <button className={modalModule.modal_personal_back} onClick={props.closeBackdrop}>Back</button>
            <button className={modalModule.modal_personal_confirm} onClick={submitSearchHandler}>Search</button>
            </div>
           
        </div>
    )
}
