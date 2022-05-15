import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendNewsletter, } from '../../../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants'
import { LoadingProd } from '../../WebElements/LoadingProd/LoadingProd'
import { MessageBlock } from '../../WebElements/MessageBlock/MessageBlock'
import modalModule from './Modal.module.css'

export const Modal_newsletter= (props) => {

    
    const [yourRespond, setYourRespond] = useState('');
    const [yourTopic, setYourTopic] = useState('')
    const adminID = useSelector(state=>state.user.profile.result._id)

   
    const dispatch = useDispatch();

    const closeScene = ()=>{
        props.closeBackdrop();
    }
    const submitFormHandler=()=>{
       // props.history.push('/');
       alert('Newsletter sent')

       dispatch(sendNewsletter({yourRespond, yourTopic, adminID }))
    }
    useEffect(() => {
      
      

    }, [])
   
    return (
        <>
        
        <div className={modalModule.modal_personal_data}>
         
            <form className={modalModule.modal_personal_form} >
                <div>
                    <h1>Newsletter Message</h1>
                </div>
               
                <div>
                    <label htmlFor='userTopic'>Topic:</label>
                    <input id='userTopic' onChange={(e)=>setYourTopic(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor='userMessage'>Message:</label>
                    <textarea id='userMessage'  onChange={(e)=>setYourRespond(e.target.value)} required></textarea>
                </div>
                <div>
                    <label />
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
       
    
          
    </>)
}
