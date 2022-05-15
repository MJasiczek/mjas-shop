import { Button, duration } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AdminSearch } from '../../../components/AdminSearch/AdminSearch'
import { LoadingProd } from '../../../components/WebElements/LoadingProd/LoadingProd'
import { MessageBlock } from '../../../components/WebElements/MessageBlock/MessageBlock'
import { adminaAllListCoffees, listCoffees, coffeeCreate, coffeeDelete } from '../../../redux/actions/coffeeActions'
import { adminSearch, signOut } from '../../../redux/actions/userActions'
import { CREATE_COFFEE_RESET, DELETE_COFFEE_RESET, COFFEE_WINDOW_RESET } from '../../../redux/constants/coffeeConstants'

import coffeeviewCSS from './CoffeesView.module.css'
export const CoffeesView = (props) => {

  const [searchValue, setSearchValue] = useState('')
  const [searchData, setSearchData] = useState('')

  
    const dispatch = useDispatch();
    const adminCoffeeList = useSelector((state) => state.adminListCoffees);
    const { loading, error, coffees } =  adminCoffeeList;
    const createdCoffee = useSelector((state)=>state.createCoffee);
    const {success: createSuccess, coffee} = createdCoffee;
    const deletedCoffee = useSelector((state)=>state.deleteCoffee);
    const {success: deleteSuccess} =deletedCoffee;
    const where = 'coffees';
    const searchHandler = ()=>{
        dispatch(adminSearch({searchValue,where, searchData }));
      //  console.log({searchValue,where, searchData })
    }
    const  createHandler=()=>{
        dispatch(coffeeCreate());
    }
    const deleteCoffeeHandler=(coffee)=>{
        dispatch(coffeeDelete(coffee._id));
    }
    const signOutHandler =()=>{
      dispatch(signOut())
  }
    useEffect(() => {
        dispatch({type:COFFEE_WINDOW_RESET})
        if(createSuccess){
            dispatch({type:CREATE_COFFEE_RESET});
            
               // props.history.push(`/coffee/${createdCoffee._id}/edit`)
        }
        if(deleteSuccess){
            dispatch({type:DELETE_COFFEE_RESET});

        }
        dispatch(adminaAllListCoffees())
        dispatch(listCoffees());
    }, [dispatch, createdCoffee, createSuccess,deleteSuccess])
    
    return (
        <div className={coffeeviewCSS.container}>
            <div className={coffeeviewCSS.editTemplate}>
                <div className={coffeeviewCSS.mainSection}>
        <div className={coffeeviewCSS.sideMenu}>
        <div className={coffeeviewCSS.sideMenuAdmin}>
            <h1>Admin</h1>
            <ul className={coffeeviewCSS.view}>
                <li ><Link to='/mainPanel'>Main</Link></li>
                <li ><Link to='/coffeesPanel'>Coffees</Link></li>
                <li ><Link to='/ordersPanel'>Orders</Link></li>
                <li ><Link to='/usersPanel'>Users</Link></li>
                <li ><Link to='/contactPanel'>Contact</Link></li>
                <li ><Link to='/newsletterPanel'>Newsletter</Link></li>
                <li onClick={signOutHandler}><Link to='/'>LOGOUT</Link></li>

            </ul>
        </div>
        
    </div>
    <div className={coffeeviewCSS.formWrapper}>

           <h2 className={coffeeviewCSS.h2}>Dashboard
           </h2>
           <div style={{textAlign:'center'}}><button type="button" className="primary" onClick={createHandler}> Create</button></div>
           <AdminSearch where={'coffees'} />

            <form className={coffeeviewCSS.cardContentAdmin}>
                
            <ul className={coffeeviewCSS.cardContent}>
            {loading ? (
        <LoadingProd/>
      ) : error ? (
        <MessageBlock variant="danger">{error}</MessageBlock>
      ) : (
        <>
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              
            </tr>
          </thead>
          <tbody style={{overflow:'hidden', overflowY:'scroll'}}>
          
            {coffees.map((coffee) => (
              <tr key={coffee._id}>
               
                <td>{coffee.brand_name}</td>
                <td>{coffee.price}</td>
                <td>{coffee.category}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/coffee/${coffee._id}/update`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteCoffeeHandler(coffee)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))} 
         
            </tbody>
            </table>
            </>)}
          </ul>
            </form>
        </div>
    </div>
    </div>
    </div>
    )
}
