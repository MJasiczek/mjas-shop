import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Backdrop_newsletter } from '../../../components/Alerts/NewsletterMessage/Backdrop'
import { Modal_newsletter } from '../../../components/Alerts/NewsletterMessage/Modal'
import { LoadingProd } from '../../../components/WebElements/LoadingProd/LoadingProd'
import {  messageWindow, signOut } from '../../../redux/actions/userActions'
import newsletterCSS from './NewsletterView.module.css'
export const NewsletterView = (props) => {

      const dispatch = useDispatch();
   
     const [newsletterWindow, setNewsletterWindow]=useState(false);

     
    
  

     const backdropNewsletter= ()=>{
      setNewsletterWindow(false);
    }
    const newsletterMessageHandler=()=>{
   
      setNewsletterWindow(!newsletterWindow);
    }
    const signOutHandler =()=>{
      dispatch(signOut())
  }

     
    return (
        <div className={newsletterCSS.container}>
             {   newsletterWindow?
                <Backdrop_newsletter closeBackdrop={backdropNewsletter}/>:null}
            {
                newsletterWindow?
              <Modal_newsletter closeBackdrop={backdropNewsletter}  />:null}  
        <div className={newsletterCSS.editTemplate}>
            <div className={newsletterCSS.mainSection}>
    <div className={newsletterCSS.sideMenu}>
    <div className={newsletterCSS.sideMenuAdmin}>
        <h1>Admin</h1>
        <ul className={newsletterCSS.view}>
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
<div className={newsletterCSS.formWrapper}>

       <h2 className={newsletterCSS.h2}>Dashboard
       </h2>

        <form className={newsletterCSS.cardContentAdmin}>
            
        <ul className={newsletterCSS.cardContent}>
       
    <>
    <table className="table">
      <thead style={{overflow:'hidden', overflowY:'scroll'}}>
        <tr>
          
          <th>NEWSLETTER</th>
         
        </tr>
      </thead>
      <tbody style={{overflow:'hidden', overflowY:'scroll'}}>
      
      <button  type="button"className="small" onClick={ newsletterMessageHandler }>Send your newsletter</button>
     
        </tbody>
        </table>
        </>
      </ul>
        </form>
    </div>
</div>
</div>
</div>
    )
}
