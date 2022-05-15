import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AdminSearch } from '../../../components/AdminSearch/AdminSearch'
import { Backdrop_respond } from '../../../components/Alerts/EmailRespond/Backdrop'
import { Modal_respond } from '../../../components/Alerts/EmailRespond/Modal'
import { LoadingProd } from '../../../components/WebElements/LoadingProd/LoadingProd'
import { allListMessages, messageDelete, messageWindow, signOut } from '../../../redux/actions/userActions'
import { DELETE_MESSAGE_RESET, LIST_ALL_CONTACT_MESSAGES_RESET, MESSAGE_WINDOW_RESET } from '../../../redux/constants/userConstants'
import contactCSS from './ContactView.module.css'
export const ContactView = (props) => {

      const dispatch = useDispatch();
     const adminList = useSelector(state => state.adminListMessages)    
     const {loading, messagesArray} = adminList;
   
     const [respondWindow, setRespondWindow]=useState(false);
     

     const deleteMessage = useSelector(state=>state.deleteMessage);

     const{refresh} = deleteMessage;
     const deleteMessageHandler =(messageToDelete)=>{
         dispatch(messageDelete(messageToDelete))
         
     }
     /*const respondMessageHandler = (messageToRespond)=>{
         dispatch(messageWindow(messageToRespond))
     }*/

     const backdropRespond= ()=>{
        setRespondWindow(false);
    }
    const respondMessageHandler=(messageToRespond)=>{
      //  e.preventDefault();
      dispatch(messageWindow(messageToRespond))
      setRespondWindow(!respondWindow);
    }
    const signOutHandler =()=>{
      dispatch(signOut())
  }

      useEffect(()=>{
        dispatch({type:LIST_ALL_CONTACT_MESSAGES_RESET});             //przeniesc nizej
          if(refresh){
              dispatch({type:DELETE_MESSAGE_RESET})
          }
          dispatch({type:MESSAGE_WINDOW_RESET})
            dispatch(allListMessages());
      },[dispatch, refresh])
     
   
    return (
        <div className={contactCSS.container}>
             {   respondWindow?
                <Backdrop_respond closeBackdrop={backdropRespond}/>:null}
            {
                respondWindow?
              <Modal_respond closeBackdrop={backdropRespond}  />:null}  
        <div className={contactCSS.editTemplate}>
            <div className={contactCSS.mainSection}>
    <div className={contactCSS.sideMenu}>
    <div className={contactCSS.sideMenuAdmin}>
        <h1>Admin</h1>
        <ul className={contactCSS.view}>
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
<div className={contactCSS.formWrapper}>

       <h2 className={contactCSS.h2}>Dashboard
       </h2>
      <AdminSearch where={'contact'}/>
        <form className={contactCSS.cardContentAdmin}>
            
        <ul className={contactCSS.cardContent}>
        {loading ? (
    <LoadingProd/>
  ) :(
    <>
    <table className="table">
      <thead style={{overflow:'hidden', overflowY:'scroll'}}>
        <tr>
          <th>EMAIL</th>
          <th>TOPIC</th>
          <th>RESPONDED</th>
          <th>DATE</th>
        </tr>
      </thead>
      <tbody style={{overflow:'hidden', /*overflowY:'scroll'*/}}>
      
        {messagesArray.map((message) => (
          <tr key={message._id}>
           
            <td>{message.email}</td>
            <td>{message.topic}</td>
            <td>{message.responded? 'yes':null}</td>
            <td>{new Date(message.createdAt).toLocaleDateString()}</td>
            <td>
              <button
                type="button"
                className="small"
                onClick={()=> respondMessageHandler(message._id) }
              >
                Respond
              </button>
              <button
                type="button"
                className="small"
                onClick={() => deleteMessageHandler(message._id)}
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
