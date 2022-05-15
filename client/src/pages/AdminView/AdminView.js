import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoadingProd } from '../../components/WebElements/LoadingProd/LoadingProd'
import { MessageBlock } from '../../components/WebElements/MessageBlock/MessageBlock'
import { shippingPriceAction, signOut } from '../../redux/actions/userActions'
import adminviewCSS from './AdminView.module.css'
export const AdminView = () => {
    const[shippingPrice, setShippingPrice]=useState(Number);
    const profileResult = useSelector(state => state.user.profile.result)
    const showItemHandler=()=>{

    }
    const dispatch=useDispatch();
    const setShippingPriceHandler =(e)=>{
        e.preventDefault();
        dispatch(shippingPriceAction(shippingPrice))
    }
    const signOutHandler =()=>{
        dispatch(signOut())
    }
    return (
        <div className={adminviewCSS.container}>
            <div className={adminviewCSS.editTemplate}>
                <div className={adminviewCSS.mainSection}>
        <div className={adminviewCSS.sideMenu}>
        <div className={adminviewCSS.sideMenuAdmin}>
            <h1>Admin</h1>
            <ul className={adminviewCSS.view}>
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
    <div className={adminviewCSS.formWrapper}>
           <h2 className={adminviewCSS.h2}>Dashboard</h2>
            <form className={adminviewCSS.cardContentAdmin}>
            <ul className={adminviewCSS.cardContent}>
            <div className={ adminviewCSS.loginName}>
            
            <span style={{color:'white'}}><p>Username:</p></span> <span style={{color:'orange'}}><p >{profileResult.username}</p></span>
            </div>
            <div className={adminviewCSS.loginName}>
            {profileResult.Admin? <><span style={{color:'white'}}><p>Status:</p></span> <span style={{color:'red'}}><p >Admin</p></span>
            </>:
                 <><span style={{color:'white'}}><p>Status:</p></span> <span style={{color:'blue'}}><p >User</p></span>
                   </>
}
            </div>
            <div className={ adminviewCSS.loginName}>
           
            <span style={{color:'white'}}><p>Email:</p></span> <span style={{color:'orange'}}><p >{profileResult.email}</p></span>
            </div>
          
            
          </ul>
            </form>
        </div>
    </div>
    </div>
    </div>
    )
}
