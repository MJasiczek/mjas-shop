import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { listOrderMine, orderListHistoryAction, userOrderList } from '../../../redux/actions/orderActions'
import { personalDataUpdate } from '../../../redux/actions/userActions'
import { LoadingProd } from '../../WebElements/LoadingProd/LoadingProd'
import { MessageBlock } from '../../WebElements/MessageBlock/MessageBlock'
import modalModule from './Modal.module.css'

export const Modal_orders = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    //const orderList = useSelector((state) => state.orderUserList);
        const usersOrders = useSelector((state) => state.userOrders);

    const { loading, error, orders } = usersOrders;
    
    useEffect(() => {
      dispatch(userOrderList());
    }, [dispatch]);
    return (
        <div className={modalModule.modal_order_history}>
            <form className={modalModule.modal_order_history_form} >
                <h2>User orders:</h2>
                {loading ? (
        <LoadingProd/>
      ) : error ? (
        <MessageBlock >{error}</MessageBlock>
      ) : (
        <table className="table">
        <thead>
          <tr>
           
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>TAKEN BACK</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
            
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.fullP.toFixed(2)}</td>
              <td>{order.Paid ? order.paidDate.substring(0, 10) : 'No'}</td>
              <td>
                {order.TakenBack

                  ? "yes"
                  : 'no'}
              </td>
              <td>
                <button type="button"className="small" onClick={() => { history.push(`/orders/${order._id}`); }}> Look up </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
            </form>
           <div className={modalModule.modal_personal_controls}>
           <button className={modalModule.modal_personal_back} onClick={props.closeBackdrop}>Back</button>

           </div>
           
        </div>
    )
}
