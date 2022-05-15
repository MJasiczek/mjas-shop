import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import cartCSS from './Cart.module.css'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { CartCoffees } from '../../components/Cart/CartCoffees';
export const Cart = (props) => {
   // const dispatch = useDispatch();
    const cartContent = useSelector(state=>state.cart);
    const profileResult = useSelector(state=>state.user.profile.result)
    const {cartYourItems} = cartContent;
    const checkoutHandler = () => {
      if(!profileResult)
        props.history.push('/signin?redirect=shipping');
        else{
          props.history.push('/shipping')
        }
      };
   /* const removeItemFromCart=(id)=>{
        dispatch(removeFromCart(id))
    }*/
    return (
        
            <div className={cartCSS.cart}>
                {
                    cartYourItems.length ==0?
                    (
                    <>
                    <div className={cartCSS.cart_empty}>
                        <ShoppingBasketIcon className={cartCSS.svg}></ShoppingBasketIcon>
                        <p className={cartCSS.p}>Your cart is empty!</p>
                        <Link to="/" className={cartCSS.a}>Start shoping!</Link>
                    </div>
           
                
                </> )
                : 
                (
                    <>
                    
                    <ul className={cartCSS.coffee}>


                        <CartCoffees cartYourItems = {cartYourItems}/>
                       <>   </>
                    </ul>
             <div className={cartCSS.divCart}>
        <div className={cartCSS.checkout}>
          <ul className={cartCSS.ul}>
            <li className={cartCSS.li}>
              <h2>
                Total ({cartYourItems.length} items) : 
                <span style={{color:'gray'}}> ${cartYourItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}</span>
              </h2>
            </li>
            <li className={cartCSS.li}>
              <button
                type="button"
                onClick={checkoutHandler}
                className={cartCSS.button}
                disabled={cartYourItems.length === 0}
              >
                Checkout
              </button>
            </li>
          </ul>
        </div>
              </div>      
                    
                    </>
                )
                }
                </div>
           
    )
}
