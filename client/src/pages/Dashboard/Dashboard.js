import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import dashboardCSS from './Dashboard.module.css'
import { signOut } from '../../redux/actions/userActions';
import { useSelector } from 'react-redux'
import { Backdrop } from '../../components/Alerts/PersonalInfo/Backdrop';
import { Backdrop_orders } from '../../components/Alerts/UserOrdersScreen/Backdrop';
import { Modal } from '../../components/Alerts/PersonalInfo/Modal';
import {Modal_orders} from '../../components/Alerts/UserOrdersScreen/Modal'
import {Button, IconButton} from '@mui/material'


import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Backdrop_edit_profile } from '../../components/Alerts/EditProfileInfo/Backdrop';
import { Modal_edit_profile } from '../../components/Alerts/EditProfileInfo/Modal';
import { Link } from 'react-router-dom';


export const Dashboard = (props) => {
    const dispatch = useDispatch();
    const profileResult = useSelector(state => state.user.profile.result)
   
    const [dropUpdateProfileScene, setUpdateProfileScene]=useState(false);
    const [dropProfileOrders, setProfileOrders]=useState(false);
    const [dropEditProfileInfo, setEditProfileInfo]=useState(false);

    const signOutHandler =()=>{
        dispatch(signOut())
    }
    const updateProfileSceneDropHandler = (e)=>{
        e.preventDefault();
        setUpdateProfileScene(!dropUpdateProfileScene);
    }
    const backdropUpdateProfileSceneDropHandler = ()=>{
        setUpdateProfileScene(false);
    }
    const ordersDropHandler = (e)=>{
        e.preventDefault();
        setProfileOrders(!dropProfileOrders);
    }
    const backdropPropProfileOrders = ()=>{
        setProfileOrders(false);
    }
    const backdropEditProfileInfo = ()=>{
        setEditProfileInfo(false);
    }
    const editProfileInfoHandler=()=>{
      //  e.preventDefault();
        setEditProfileInfo(!dropEditProfileInfo );
    }
   
    //props.history.push('/signin?redirect=signin');
   
    useEffect(() => {
       /* if(!profileResult){
            props.history.push('/signin')
        }*/
        if(!profileResult){
            props.history.push('/signin')
           
        }
       
    }, [])
    return (
        <>{!profileResult? 
        props.history.push('/signin?')
        :
        
        <div className={ dashboardCSS.login}>
               
            {   dropUpdateProfileScene?
                <Backdrop closeBackdrop={backdropUpdateProfileSceneDropHandler}/>:null}
            {
              dropUpdateProfileScene ?
              <Modal closeBackdrop={backdropUpdateProfileSceneDropHandler} />:null}  
            
            {   dropProfileOrders?
                <Backdrop_orders closeBackdrop={backdropPropProfileOrders}/>:null}
            {
                dropProfileOrders?
              <Modal_orders closeBackdrop={backdropPropProfileOrders} />:null}  

                {   dropEditProfileInfo?
                <Backdrop_edit_profile closeBackdrop={backdropEditProfileInfo}/>:null}
            {
              dropEditProfileInfo ?
              <Modal_edit_profile closeBackdrop={backdropEditProfileInfo} />:null}  
            
           
        <form className={ dashboardCSS.loginContainer} >
        <div className={ dashboardCSS.loginTitle}>
            <h5>My Account<Button onClick={ editProfileInfoHandler}> <PersonOutlineIcon style={{color:'white', paddingRight:4, fontroast:20}}></PersonOutlineIcon></Button> </h5>
        
            </div>
         <div className={ dashboardCSS.loginFields}>
         <div className={ dashboardCSS.loginName}>
             <PersonIcon />
            <span style={{color:'white'}}><p>Username:</p></span> <span style={{color:'orange'}}><p style={{paddingLeft:'15px'}}>{profileResult.username}</p></span>
            </div>
            <div className={ dashboardCSS.loginName}>
            {profileResult.Admin? <><span style={{color:'white'}}><p>Status:</p></span> <span style={{color:'red'}}><p style={{paddingLeft:'15px'}}>Admin</p></span>
            </>:
                 <><span style={{color:'white'}}><p>Status:</p></span> <span style={{color:'blue'}}><p style={{paddingLeft:'15px'}}>User</p></span>
                   </>
}
            </div>
            <div className={ dashboardCSS.loginPassword}>
            <LockIcon />
            <span style={{color:'white'}}><p>Email:</p></span> <span style={{color:'orange'}}><p style={{paddingLeft:'15px'}}>{profileResult.email}</p></span>
            </div>
        </div>
        <div className={ dashboardCSS.loginControls}>
        <button className={ dashboardCSS.button} onClick={updateProfileSceneDropHandler}>Personal Data</button>
        <button className={ dashboardCSS.button} onClick={ordersDropHandler} >Your Orders</button>
        {profileResult.Admin?         <button className={dashboardCSS.button} onClick={(e)=>{e.preventDefault()}}><Link to='/mainPanel'>Admin Panel</Link></button>
                : null}
            </div>
            <button className={ dashboardCSS.button} onClick={signOutHandler}>Log Out</button>

        </form>
        </div>
}
        </>
    )
}
