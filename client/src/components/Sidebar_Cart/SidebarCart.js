import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartCoffees } from '../Cart/CartCoffees'
import sidebarCartCSS from './SidebarCart.module.css'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
export const SidebarCart = (props) => {
    //const dispatch = useDispatch();
    const cartContent = useSelector(state=>state.cart);
    const {cartYourItems} = cartContent;

    return (
        <div className={ props.sideBarToggle ? sidebarCartCSS.sidebar_expand : sidebarCartCSS.sidebar_shrink} >
        <div className={sidebarCartCSS.sidebar_cart}>
            <h3 style={{color: '#c96216'}}>Your Cart</h3>
            <form>
           
            <div className={sidebarCartCSS.sidebar_cart_price}><span className={sidebarCartCSS.span}>Items: {cartYourItems.length} </span> <span className={sidebarCartCSS.span}>Price: ${cartYourItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}</span></div>
            
            <div className={sidebarCartCSS.sidebar_cart_content}>
            {
                    cartYourItems.length ==0?
                    (
                    <>
                    <div className={sidebarCartCSS.cart_empty}>
                        <ShoppingBasketIcon className={sidebarCartCSS.svg}></ShoppingBasketIcon>
                        <p className={sidebarCartCSS.p}>Your cart is empty!</p>
                        <Link to="/" className={sidebarCartCSS.a}>Start shoping!</Link>
                    </div>
           
                
                </> )
                :
                (
                 <CartCoffees cartYourItems={cartYourItems}/> 
                )
                }   
                </div>
          
            <div className={sidebarCartCSS.sidebar_button_cart}><Link to ='/cart'><button className={sidebarCartCSS.button}>Visit Your Cart</button></Link></div>
            </form>
        </div>
        </div>
    )
}
