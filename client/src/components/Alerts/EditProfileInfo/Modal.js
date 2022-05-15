import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { personalDataUpdate, updateUserProfile } from '../../../redux/actions/userActions'
import modalModule from './Modal.module.css'

export const Modal_edit_profile = (props) => {

    const profileResult = useSelector(state => state.user.profile.result)
    const [username, setYourUsername] = useState(profileResult.username?profileResult.username:'')
    const [email, setYourEmail] = useState(profileResult.email?profileResult.email:'')
    const [password, setYourPassword] = useState('')
    const [newsletter, setNewsletter] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const closeScene = ()=>{
        props.closeBackdrop();
    }
    const submitUpdateHandler=()=>{
        var mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(password===confirmPassword){
            if(email.match(mailValidation)){
                dispatch(updateUserProfile({userID: profileResult._id, username, password, email, newsletter}))
                alert('Profile updated')
            }else{
                alert('Wrong email')
            }
            
        }else{
            alert("Password doesnt match")
        }
    }
    useEffect(()=>{

    },[])
    return (
        <div className={modalModule.modal_personal_data}>
            <form className={modalModule.modal_personal_form} >
                <div>
                    <h1>Account Information</h1>
                </div>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' placeholder='New username' value={username} onChange={(e)=>setYourUsername(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='yourAddress' placeholder='New email' value={email} onChange={(e)=>setYourEmail(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' placeholder='New password' value={password} onChange={(e)=>setYourPassword(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' placeholder='Confirm Your password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} ></input>
                </div>
                <div>
                    <label htmlFor='confirmpassword'>Newsletter</label>
                    <select className={modalModule.select} onChange={(e)=>(setNewsletter(e.target.value))}>
                        <option value={"true"} selected={profileResult.newsletter==true?true:false}>yes</option>
                        <option value={"false"} selected={profileResult.newsletter==false?true:false}>no</option>

                    </select>
                </div>
               
               
            </form>
            <div className={modalModule.modal_personal_controls}>
            <button className={modalModule.modal_personal_back} onClick={props.closeBackdrop}>Back</button>
            <button className={modalModule.modal_personal_confirm} onClick={submitUpdateHandler}>Confirm</button>
            </div>
           
        </div>
    )
}
