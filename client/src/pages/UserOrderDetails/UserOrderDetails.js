import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { LoadingProd } from '../../components/WebElements/LoadingProd/LoadingProd';
import { MessageBlock } from '../../components/WebElements/MessageBlock/MessageBlock';
import { takeBackOrder as tO, orderDetails, payYourOrder } from '../../redux/actions/orderActions';
import {PayPalButton} from 'react-paypal-button-v2'
import css from './UserOrderDetails.module.css'
import {  ORDER_PAYMENT_RESET, TAKEBACK_ORDER_RESET } from '../../redux/constants/orderConstants';
import StripeCheckout from 'react-stripe-checkout';
export const UserOrderDetails = (props) => {
    const orderID = props.match.params.id;
    const paymentOrder = useSelector(state=>state.paymentOrder)
    const {error: paymentError, success: paymentSuccess} = paymentOrder;
    const dispatch = useDispatch();
    const [stripeConf, setStripeConf] = useState(false); 
    const orderData = useSelector((state)=>state.detailOrder);
    const userID = useSelector((state)=>state.user.profile.result._id);
    const user = useSelector((state)=>state.user.profile.result);
    const {Admin} = user;
    const takebackOrder = useSelector(state=>state.takebackOrder)
    const {error:  takebackError, success: takebackSuccess} = takebackOrder;
    


    const {loading, error, order} = orderData;
    const [orderDet, setOrderDet] = useState({})
    const tokenHandler=async (token/*, addresses*/)=>{
        //console.log({token, addresses})
       const resp =  await axios.post('/stripe/payment/config', {
            token, order
        })
        const {status} = resp.data;
        if(status=="Success"){
            dispatch(payYourOrder(order/*, paymentResult*/))

        }
    }
    const userPaymentHandler=(/*paymentResult*/)=>{
        dispatch(payYourOrder(order/*, paymentResult*/))
    }
    const takebackHandler=()=>{
        dispatch(tO(order._id, userID));
    }
    useEffect(() => {
        
        
        if(!order || (order && order._id !== orderID || paymentSuccess ||takebackSuccess)){
            dispatch({type:ORDER_PAYMENT_RESET})
            dispatch({type:TAKEBACK_ORDER_RESET})
            dispatch(orderDetails(orderID))
        }else{
            if(order.Paid == false){
                
                    setStripeConf(true)
            
            }
        }
       
    }, [ orderID, stripeConf, order, paymentSuccess, takebackSuccess ])
    return loading ? (
        <LoadingProd />
      ) : error ? (
        <MessageBlock variant="danger">{error}</MessageBlock>
      ) : 
      userID!==order.user && !Admin?(
        
        <MessageBlock variant="danger">Sorry, but thats not your order</MessageBlock>
       
      )
      :(
    <div className={css.order}>
       
        <div className={css.st1}>
            
            <ul style={{listStyle:'none'}}>
                <li><div className={css.cardContent}>
               
               <div>
               <h4>Shipping Details:</h4>

               <h5>ID of your order: <span style={{color:'orange'}}> {order._id}</span></h5>
                   <h5>Full name: <span style={{color:'orange'}}> {order.shippingInfo.yourName}</span></h5>
                   <h5>Address:  <span style={{color:'orange'}}> {order.shippingInfo.yourAddress}</span></h5>
                   <h5>Post Code:   <span style={{color:'orange'}}>{order.shippingInfo.yourPostCode}</span></h5>
                   <h5>City:   <span style={{color:'orange'}}>{order.shippingInfo.yourCity}</span></h5>
                   <h5>Country:   <span style={{color:'orange'}}>{order.shippingInfo.yourCountry}</span></h5>
                  
               </div>
               </div></li>
                <li><div className={css.cardContent}>
               
               <div>
               <h4>Payment Method/Delivery:</h4>

                   <h5>Payment: <span style={{color:'orange'}}> {order.paymentData}</span></h5>
                   <h5>Delivery: <span style={{color:'orange'}}> {order.shippingInfo.yourDelivery}</span></h5>
                  
               </div>
               </div></li>
               {Admin==true  && order.Paid==false && order.TakenBack==false &&(
               <li><div className={css.cardContent}>
              
                       <div><button onClick={takebackHandler}>Takeback</button></div>
                  
               </div></li>
                )
            }
              
            </ul>
        </div>
        <div className={css.st2}>
            <ul style={{listStyle:'none'}}>
            <li><div className={css.cardContent}>
                   
               
               <div>
               <h4>Summary:</h4>
                   <h5>Price for your items: <span style={{color:'orange'}}> ${order.itemsP}</span></h5>
                   <h5>Shipping price (above $150 shipping is free): <span style={{color:'orange'}}> ${order.shippingP}</span></h5>
                   <h5>Total price: <span style={{color:'orange'}}> ${order.fullP.toFixed(2)}</span></h5>
                   <h5>Paid:{order.Paid==false?  <span style={{color:'red'}}> Not paid</span> :<span style={{color:'orange'}}> Paid</span> }</h5>
                    {order.TakenBack&&<h5 style={{color:'red'}}>Order taken back</h5>}
                   {order.Paid==false && order.TakenBack==false &&(
                       <div>{stripeConf==false?(<LoadingProd/>):(<>{paymentError&&<MessageBlock>There is problem with your payment: {paymentError}</MessageBlock>}
                     <StripeCheckout stripeKey='pk_test_51KGkUXAqXRz8MaivjmgXQhZoKjYE1gbkaU6gKow6ozq4aT3ov1gs8Fb9xPUJmtlAb9bvjLaTH1iMyBH5L31fr1Po00KdK8Y3oL' token={tokenHandler} billingAddress shippingAddress={order.shippingInfo} amount={order.fullP*100} name={order._id}/> </>)}</div>
                   )}
                   
                   <div>
                <label />
             </div>    
               </div>
               </div></li>
               <li><div className={css.cardContent}>
                
               
               <div>
               <h4>Your orders:</h4>
                   <ul style={{display:'flex', flexDirection:'column', padding:'1rem' }}>
                   {order.userOrders.map((x)=>(
                               <li key={x.name}>
                                   <div className="row">
                                         <div>
                                              
                                        </div>
                                <div className="min-30">
                                 <Link to={`/category=${x.category}/${x.id}`}>
                                   {x.name}
                                 </Link>
                                  </div>
                                  <div>
                                      {x.roast}
                                  </div>
                                  <div>
                                     {x.pID}
                                  </div>

                        <div>
                          <p>{x.quantity} x ${x.price} = ${x.quantity * x.price}</p>
                        </div>
                      </div>
                               </li>
                   ))}
                   </ul>
                  
               </div></div></li>
            </ul>
        </div>
        </div> 
                
 
        
      
   
    )
}
