import React, {useEffect, useState} from 'react'
import placeYourOrderCSS from './PlaceYourOrder.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { set } from 'mongoose'
import { createOrder, deleteTerms } from '../../redux/actions/orderActions'
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants'
import { LoadingProd } from '../../components/WebElements/LoadingProd/LoadingProd'
import { MessageBlock } from '../../components/WebElements/MessageBlock/MessageBlock'
export const PlaceYourOrder = (props) => {

    const [itemsP, setItemsP] = useState(0)
    const [shippingP, setShippingP] = useState(0)
    const [fullP, setfullP] = useState(0)
    const [allCoffeesIDToDelete, setAllCoffeesIDToDelete] = useState([]);
    const [allCoffeesQUANTITYToDelete, setAllCoffeesQUANTITYToDelete] = useState([]);
    const [adminPassword, setAdminPassword] = useState("")
    const dispatch = useDispatch()
    const profileResult = useSelector(state=>state.user.profile.result)
    const {_id, email} = profileResult;
    const yourCart = useSelector(state=>state.cart.cartYourItems);
    const cart = useSelector(state=>state.cart);
    const cartShippingInfo = useSelector(state=>state.cart.shippingInfo);
    const cartPaymentData = useSelector(state=>state.cart.paymentData);
    const orderReducer = useSelector(state=>state.createOrder);
    const {loading, success, order, error} = orderReducer;
    
    const submitOrder=(e)=>{
        e.preventDefault();
        
           var a=[];
           var b=[];
           yourCart.map((x)=>{
              
               a.push(x.pID);
               b.push(x.quantity)
               
              
           })
           setAllCoffeesIDToDelete(a)
           setAllCoffeesQUANTITYToDelete(b)
           //if(typeof a !== 'undefined' && a.length>0){
            dispatch(createOrder({userOrders: cart.cartYourItems, shippingInfo:cartShippingInfo, paymentData: cartPaymentData, itemsP:itemsP, shippingP:shippingP, fullP:fullP, user:_id, email:email }));
            
           console.log(allCoffeesIDToDelete, allCoffeesQUANTITYToDelete)
           
    }
    useEffect(()=>{
       
        var a=[];
           var b=[];
           yourCart.map((x)=>{
              
               a.push(x.pID);
               b.push(x.quantity)
               
              
           })
           setAllCoffeesIDToDelete(a)
           setAllCoffeesQUANTITYToDelete(b)

    },[yourCart, setAllCoffeesIDToDelete,setAllCoffeesQUANTITYToDelete ])

    useEffect(() => {
       setItemsP(Number(yourCart.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2))) 
        if(itemsP>=30){
            setShippingP(0)
        }else{
            setShippingP(25)
        }
        setfullP(itemsP+shippingP);
    }, [itemsP, shippingP]);

    useEffect(() => {
       if(success){
           props.history.push(`/orders/${order._id}`);
           dispatch({type:ORDER_CREATE_RESET})
       }
    }, [success])
   
    return (
        <div>
            {loading && < LoadingProd/>}
            {error && <MessageBlock variant='danger' >{error}</MessageBlock> }
            <div className={placeYourOrderCSS.order}>
            <div className={placeYourOrderCSS.st1}>
                <ul style={{listStyle:'none'}}>
                    <li><div className={placeYourOrderCSS.cardContent}>
                       <h4>Shipping Address:</h4>
                   
                   <div>
                       <h5>Full name: <span style={{color:'orange'}}> {cartShippingInfo.yourName}</span></h5>
                       <h5>Address:  <span style={{color:'orange'}}> {cartShippingInfo.yourAddress}</span></h5>
                       <h5>Post Code:   <span style={{color:'orange'}}>{cartShippingInfo.yourPostCode}</span></h5>
                       <h5>City:   <span style={{color:'orange'}}>{cartShippingInfo.yourCity}</span></h5>
                       <h5>Country:   <span style={{color:'orange'}}>{cartShippingInfo.yourCountry}</span></h5>
                      
                   </div>
                   </div></li>
                    <li><div className={placeYourOrderCSS.cardContent}>
                       <h4>Payment Method/Delivery:</h4>
                   
                   <div>
                       <h5>Payment: <span style={{color:'orange'}}> {cartPaymentData}</span></h5>
                       <h5>Delivery: <span style={{color:'orange'}}> {cartShippingInfo.yourDelivery}</span></h5>
                      
                   </div>
                   </div></li>
                    <li><div className={placeYourOrderCSS.cardContent}>
                    <h4>Your orders:</h4>
                   
                   <div>
                       <ul style={{display:'flex', flexDirection:'column', padding:'1rem', listStyle:'none' }}>
                           {yourCart.map((x)=>(
                               <li key={x.brand_name}>
                                   <div className="row">
                                         <div>
                                               
                                        </div>
                                <div className="min-30">
                                 <Link to={`/category=cart/${x.id}`}>
                                   {x.brand_name}
                                 </Link>
                                 <div>{x.roast}</div>
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
            <div className={placeYourOrderCSS.st2}>
                <ul style={{listStyle:'none'}}>
                <li><div className={placeYourOrderCSS.cardContent}>
                       <h4>Summary:</h4>
                   
                   <div>
                       <h5>Price for your coffees: <span style={{color:'orange'}}> ${itemsP.toFixed(2)}</span></h5>
                       <h5>Shipping price (above $30 shipping is free): <span style={{color:'orange'}}> ${shippingP.toFixed(2)}</span></h5>
                       <h5>Total price: <span style={{color:'orange'}}> ${fullP.toFixed(2)}</span></h5>
                       
                       <div>
                    <label />
                    <button style={{width:'50%'}} disabled={yourCart.length===0} onClick={submitOrder} className={placeYourOrderCSS.button}>Place your order</button>
                 </div>    
                   </div>
                   </div></li>
                </ul>
            </div>
            </div>
        </div>
    )
}
