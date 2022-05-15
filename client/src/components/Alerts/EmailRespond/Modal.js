import e from 'cors'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageWindow, personalDataUpdate, sendRespond } from '../../../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'
import { LoadingProd } from '../../WebElements/LoadingProd/LoadingProd'
import { MessageBlock } from '../../WebElements/MessageBlock/MessageBlock'
import modalModule from './Modal.module.css'

export const Modal_respond = (props) => {

    const adminRespondWindow = useSelector(state => state.messageWindow)
     const { message, loading, error} = adminRespondWindow;
    const profileResult = useSelector(state => state.user.profile.result)
    const [yourRespond, setYourRespond] = useState('')
   
    const dispatch = useDispatch();

    const closeScene = ()=>{
        props.closeBackdrop();
    }
    const submitFormHandler=()=>{
       // props.history.push('/');
       if(yourRespond==''){
           alert('Your response is empty!')
       }
       else{
        alert('Email sent')

        dispatch(sendRespond({yourRespond,email:message.email, topic:message.topic, id:message._id }))
       }
      
    }
    useEffect(() => {
      
      

    }, [])
   
    return (
        <>
        {loading ? (
            <LoadingProd/>
          ) : error ? (
            <MessageBlock >{error}</MessageBlock>
          ) : (
        <div className={modalModule.modal_personal_data}>
         
            <form className={modalModule.modal_personal_form} >
                <div>
                    <h1>Message ID: {message._id}</h1>
                </div>
                <div>
                    <label htmlFor='userEmail'>Email: {message.email}</label>
                </div>
                <div>
                    <label htmlFor='userTopic'>Topic: {message.topic}</label>
                </div>
                <div>
                    <label htmlFor='userMessage'>Message:</label>
                    <textarea id='userMessage'  value={message.message}  ></textarea>
                </div>
                <div>
                    <label />
                </div>
                <div>
                    <label htmlFor='yourMessage'>Respond:</label>
                    <textarea id='yourMessage'  onChange={(e)=>setYourRespond(e.target.value)} ></textarea>
                </div>
                <div>
                    <label />
                </div>
            </form>
      
            <div className={modalModule.modal_personal_controls}>
            <button className={modalModule.modal_personal_back} onClick={props.closeBackdrop}>Back</button>
            <button className={modalModule.modal_personal_confirm} onClick={submitFormHandler}>Respond</button>
            </div>
      
        </div>
       
    )
          }
    </>)
}
