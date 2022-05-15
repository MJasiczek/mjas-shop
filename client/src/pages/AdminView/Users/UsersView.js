import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AdminSearch } from '../../../components/AdminSearch/AdminSearch'
import { LoadingProd } from '../../../components/WebElements/LoadingProd/LoadingProd'
import { allListOrder, orderDelete } from '../../../redux/actions/orderActions'
import { getAllUsers, signOut, userDelete } from '../../../redux/actions/userActions'
import { DELETE_ORDER_RESET, LIST_ALL_ORDERS_RESET } from '../../../redux/constants/orderConstants'
import usersCSS from './UsersView.module.css'
export const UsersView = (props) => {

      const dispatch = useDispatch();
     const adminList = useSelector(state => state.adminListUser)
     const {loading, users} = adminList;
     const adminDelete = useSelector(state => state.deleteUser)
     const { success} = adminDelete;
    
     const deleteUserHandler =(user)=>{
         
         dispatch(userDelete(user._id))
     }
     const signOutHandler =()=>{
      dispatch(signOut())
  }
      useEffect(()=>{
       // dispatch({type:LIST_ALL_USERS_RESET});             
         // if(success){
             // dispatch({type:DELETE_ORDER_RESET})
        //  }
            dispatch(getAllUsers());
      },[dispatch,success])
    return (
        <div className={usersCSS.container}>
        <div className={usersCSS.editTemplate}>
            <div className={usersCSS.mainSection}>
    <div className={usersCSS.sideMenu}>
    <div className={usersCSS.sideMenuAdmin}>
        <h1>Admin</h1>
        <ul className={usersCSS.view}>
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
<div className={usersCSS.formWrapper}>

       <h2 className={usersCSS.h2}>Dashboard
       </h2>
      <AdminSearch where={'users'} />
        <form className={usersCSS.cardContentAdmin}>
            
        <ul className={usersCSS.cardContent}>
        {loading ? (
    <LoadingProd/>
  ) : /*error ? (
    <MessageBlock variant="danger">{error}</MessageBlock>
  ) : */(
    <>
    <table className="table">
      <thead>
        <tr>
          <th>EMAIL</th>
          <th>USERNAME</th>
          <th>ADMIN</th>
        </tr>
      </thead>
      <tbody style={{overflow:'hidden', overflowY:'scroll'}}>
      
        {users.map((user) => (
          <tr key={user._id}>
           
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td style={{color:'red'}}>{user.Admin? `yes`:null}</td>
            <td>
             {/* <button
                type="button"
                className="small"
                /*onClick={() =>
                  props.history.push(`/orders/${order._id}/update`)
                }
              >
                Edit
              </button>*/}
              {user.Admin?
              null
              :
              <button
                type="button"
                className="small"
                onClick={() => deleteUserHandler(user)}
              >
                Delete
              </button>
              }
              
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
