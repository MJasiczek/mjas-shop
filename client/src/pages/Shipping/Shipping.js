import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import { shippingInfo as shippingData } from '../../redux/actions/cartActions'
import { paymentData } from '../../redux/actions/cartActions'

import shippingCSS from './Shipping.module.css'
export const Shipping = (props) => {
    const cart = useSelector(state=>state.cart);
    const profileResult = useSelector(state => state.user.profile.result)

    const {shippingInfo} = cart
    const [_id, setId] = useState('')
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [yourName, setYourName] = useState(profileResult.personalInfo.yourName? profileResult.personalInfo.yourName: "")
    const [yourDelivery, setYourDelivery] = useState("Shoply Delivery Services")
    const [yourAddress, setYourAddress] = useState(profileResult.personalInfo.yourAddress? profileResult.personalInfo.yourAddress: "")
    const [yourPostCode, setYourPostCode] = useState(profileResult.personalInfo.yourPostCode? profileResult.personalInfo.yourPostCode: "")
    const [yourCity, setYourCity] = useState(profileResult.personalInfo.yourCity? profileResult.personalInfo.yourCity: "")
    const [yourCountry, setYourCountry] = useState(profileResult.personalInfo.yourCountry? profileResult.personalInfo.yourCountry: "")
    const yourCart = useSelector(state=>state.cart.cartYourItems);
  ;
   
    const dispatch = useDispatch();
    const [payment, setPayment] = useState('');
    const submitFormHandler = (e)=>{
        e.preventDefault();
        dispatch(paymentData(payment))
        dispatch(shippingData({yourName, yourAddress, yourPostCode, yourCity, yourCountry, yourDelivery}))
        

        props.history.push('/placeorder')
    }
   
    useEffect(() => {
        let cartInside = yourCart
     
        if(!profileResult){
            props.history.push('/signin')
           
        }
        else if(cartInside.length==0){
            props.history.push('/')
        }else{
            const {_id, username, email} = profileResult;
        const a = (e)=>{
            setId(_id);
            setName(username);
            setEmail(email);
        }
            a()
        }
        return;
    }, [])
    return (
        <div>
            <div className={shippingCSS.ship}>
            <form className={shippingCSS.form} onSubmit={submitFormHandler}>
                <div>
                    <h1>Address for shipping</h1>
                </div>
                <div>
                    <label htmlFor='yourName'>Full Name</label>
                    <input type='text' id='yourName' placeholder='Type your full name' value={yourName} onChange={(e)=>setYourName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor='yourAddress'>Address</label>
                    <input type='text' id='yourAddress' placeholder='Type your adress' value={yourAddress} onChange={(e)=>setYourAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor='yourPostCode'>Post Code</label>
                    <input type='text' id='yourPostCode' placeholder='Type your postal code' value={yourPostCode} onChange={(e)=>setYourPostCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor='yourCity'>City</label>
                    <input type='text' id='yourCity' placeholder='Type your city' value={yourCity} onChange={(e)=>setYourCity(e.target.value)} required checked></input>
                </div>
                <div>
                    <label htmlFor='yourCountry'>Country</label>
                    <input type='text' id='yourCountry' placeholder='Type your country' value={yourCountry} onChange={(e)=>setYourCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor='yourDelivery'><span style={{color:'orange'}}>Delivery</span></label>
                    <label htmlFor='yourDelivery' style={{fontStyle:'italic'}}>Shoply Delivery Services</label>
                    <input type='radio' id='yourDelivery'  value={yourDelivery} onChange={(e)=>setYourDelivery(e.target.value)}checked required></input>
                </div>
                <div>
                    <label htmlFor='stripe'>Stripe</label>
                    <input type='radio' id='stripe' value='Stripe' name='payment' onChange={(e)=>setPayment(e.target.value)} required  />
                    </div>
                <div>
                    <label />
                <button style={{width:'50%'}} className={shippingCSS.button}>Forward</button>
                </div>
            </form>
            <div className={shippingCSS.shipBut}>
                   <h3>User information</h3>
                   <div className={shippingCSS.shipBut_content}>
                       <h4>Order made by:</h4>
                   
                   <div>
                       <h5>Username: <span style={{color:'orange'}}> {username}</span></h5>
                       <h5>id:  <span style={{color:'orange'}}> {_id}</span></h5>
                       <h5>email:   <span style={{color:'orange'}}>{email}</span></h5>
                   </div>
                   </div>
                 
                </div>
                </div>
        </div>
    )
}
