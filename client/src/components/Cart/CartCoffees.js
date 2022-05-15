import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import cartCoffeesCSS from './CartCoffees.module.css'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
export const CartCoffees = ({cartYourItems}) => {

    const dispatch = useDispatch();
   /* const removeItemFromCart=()=>{
        dispatch(removeFromCart(id, roast))
    }*/

    return (
        <>
                 { cartYourItems.map((e)=>(
            <div className={cartCoffeesCSS.divCart} key={e.id}>
                        
                        <div className={cartCoffeesCSS.colCart}>
                         
                        </div>
                        <div className={cartCoffeesCSS.colCart}>
                        <p className={cartCoffeesCSS.p}>Brand name</p>

                            <Link to={`/category=cart/${e.id}`}>{e.brand_name}</Link>
                        </div>
                        <div className={cartCoffeesCSS.colCart}>
                            <p className={cartCoffeesCSS.p}>Roast Type</p>
                            <h6 style={{color:'#dbad2e'}}>{e.roast}</h6>
                        </div>
                        <div className={cartCoffeesCSS.colCart}>
                            <p className={cartCoffeesCSS.p}>Quantity</p>
                            <h6 style={{color:'#dbad2e'}}>{e.quantity}</h6>
                        </div>
                       
                        <div className={cartCoffeesCSS.colCart}>
                            <p className={cartCoffeesCSS.p}>Price</p>
                            <h6 style={{color:'orange'}}>$ {e.price}</h6>
                        </div>
                        <div className={cartCoffeesCSS.colCart}>
                        <Button style={{color:'red'}} onClick={()=>dispatch(removeFromCart(e.pID))}><DeleteIcon style={{fontSize:'18px'}}></DeleteIcon></Button> 
                        </div>
                    
                    </div>
        ))}
        </>
    )
}
