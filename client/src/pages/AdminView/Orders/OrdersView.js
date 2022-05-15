import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AdminSearch } from '../../../components/AdminSearch/AdminSearch'
import { LoadingProd } from '../../../components/WebElements/LoadingProd/LoadingProd'
import { allListOrder, orderDelete } from '../../../redux/actions/orderActions'
import { adminSearch, signOut } from '../../../redux/actions/userActions'
import { DELETE_ORDER_RESET, LIST_ALL_ORDERS_RESET } from '../../../redux/constants/orderConstants'
import ordersCSS from './OrdersView.module.css'
export const OrdersView = (props) => {

      const dispatch = useDispatch();
      const [searchValue, setSearchValue] = useState('');
      const [searchData, setSearchData] = useState('');
     const adminList = useSelector(state => state.adminListOrder)
     const {loading, orders} = adminList;
     const deleteOrder = useSelector(state=>state.deleteOrder);

     const{success} = deleteOrder;


    
    
    const where = 'orders';
    const searchHandler = ()=>{
      dispatch(adminSearch({searchValue,where, searchData }));
    
  }
     const deleteOrderHandler =(orderToDelete)=>{
         dispatch(orderDelete(orderToDelete._id))
     }
     const signOutHandler =()=>{
      dispatch(signOut())
  }
      useEffect(()=>{
        dispatch({type:LIST_ALL_ORDERS_RESET});             
          if(success){
              dispatch({type:DELETE_ORDER_RESET})
          }
         
            dispatch(allListOrder());
      },[dispatch, success])
    return (
        <div className={ordersCSS.container}>
        <div className={ordersCSS.editTemplate}>
            <div className={ordersCSS.mainSection}>
    <div className={ordersCSS.sideMenu}>
    <div className={ordersCSS.sideMenuAdmin}>
        <h1>Admin</h1>
        <ul className={ordersCSS.view}>
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
<div className={ordersCSS.formWrapper}>

       <h2 className={ordersCSS.h2}>Dashboard
       </h2>
       <AdminSearch where={'orders'}/>
        <form className={ordersCSS.cardContentAdmin}>
            
        <ul className={ordersCSS.cardContent}>
        {loading ? (
    <LoadingProd/>
  ) : /*error ? (
    <MessageBlock variant="danger">{error}</MessageBlock>
  ) : */(
    <>
    <table className="table">
      <thead>
        <tr >
          <th>EMAIL</th>
          <th>PRICE</th>
          <th>PAID</th>
          <th>TAKEN BACK</th>
        </tr>
      </thead>
      <tbody style={{overflow:'hidden', overflowY:'scroll'}}>
      
        {orders.map((order) => (
          <tr key={order._id}>
           
            <td>{order.user_email}</td>
            <td>${order.fullP.toFixed(2)}</td>
            <td>{order.Paid? `paid`:null}</td>
            <td style={{color:'red'}}>{order.TakenBack? `yes`:null}</td>

            <td>
              <button
                type="button"
                className="small"
                onClick={() =>
                  props.history.push(`/orders/${order._id}`)
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="small"
                onClick={() => deleteOrderHandler(order)}
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
