import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { personalDataUpdate } from '../../../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'
import modalModule from './Modal.module.css'

export const Modal = (props) => {

   
    const profileResult = useSelector(state => state.user.profile.result)
    const [yourName, setYourName] = useState(profileResult.personalInfo.yourName?profileResult.personalInfo.yourName:'')
    const [yourDelivery, setYourDelivery] = useState(profileResult.personalInfo.yourName?profileResult.personalInfo.yourDelivery:'Shoply Delivery Services')
    const [yourAddress, setYourAddress] = useState(profileResult.personalInfo.yourName?profileResult.personalInfo.yourAddress:'')
    const [yourPostCode, setYourPostCode] = useState(profileResult.personalInfo.yourName?profileResult.personalInfo.yourPostCode:'')
    const [yourCity, setYourCity] = useState(profileResult.personalInfo.yourName?profileResult.personalInfo.yourCity:'')
    const [yourCountry, setYourCountry] = useState(profileResult.personalInfo.yourName?profileResult.personalInfo.yourCountry:'')
    const dispatch = useDispatch();
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    const submitFormHandler=()=>{
        dispatch(personalDataUpdate({userID:profileResult._id,yourName, yourAddress, yourPostCode, yourCity, yourCountry, yourDelivery, id:profileResult._id}))
       // props.history.push('/');
       alert('User updated')
    }
   
    return (
        <div className={modalModule.modal_personal_data}>
            <form className={modalModule.modal_personal_form} >
                <div>
                    <h1>User personal information</h1>
                </div>
                <div>
                    <label htmlFor='yourName'>Full Name</label>
                    <input type='text' id='yourName' placeholder='Type your full name' value={yourName} onChange={(e)=>setYourName(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor='yourAddress'>Address</label>
                    <input type='text' id='yourAddress' placeholder='Type your adress' value={yourAddress} onChange={(e)=>setYourAddress(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor='yourPostCode'>Post Code</label>
                    <input type='text' id='yourPostCode' placeholder='Type your postal code' value={yourPostCode} onChange={(e)=>setYourPostCode(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor='yourCity'>City</label>
                    <input type='text' id='yourCity' placeholder='Type your city' value={yourCity} onChange={(e)=>setYourCity(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor='yourCountry'>Country</label>
                    <input type='text' id='yourCountry' placeholder='Type your country' value={yourCountry} onChange={(e)=>setYourCountry(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='yourDelivery'><span style={{color:'orange'}}>Delivery</span></label>
                    <label htmlFor='yourDelivery' style={{fontStyle:'italic'}}>Shoply Delivery Services</label>
                    <input type='radio' id='yourDelivery'  value={yourDelivery} onChange={(e)=>setYourDelivery(e.target.value)} required checked></input>
                </div>
                <div><label /></div>
            </form>
            <div className={modalModule.modal_personal_controls}>
            <button className={modalModule.modal_personal_back} onClick={props.closeBackdrop}>Back</button>
            <button className={modalModule.modal_personal_confirm} onClick={submitFormHandler}>Confirm</button>
            </div>
           
        </div>
    )
}
