import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { sendMessage } from '../../redux/actions/userActions'
import contactCSS from './Contact.module.css'
export const Contact = (props) => {

    const [email, setEmail] = useState('')
    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch();
    
    const submitMessage=(e)=>{
        e.preventDefault();
        var mailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.match(mailValidation)){
            dispatch(sendMessage({email, topic, message}))
            props.history.push('/')
            alert('Sent')
        }else{
            alert('Wrong email')
        }
       
    }
    useEffect(() => {
       
    }, [])
    return (
        <div className={contactCSS.contact}>
           <div className={contactCSS.header}>
            <h1 className={contactCSS.h1}>Contact</h1>
        </div>
        <div className={contactCSS.contact_content}>
            <div className={contactCSS.contact_contentInfo}>
                <h4 className={contactCSS.h4}>Send your message </h4>
                <p className={contactCSS.p}>Fill in the form with your feed back </p>
            </div>
            <div className={contactCSS.contact_contentForm}>
                <form className={contactCSS.contactForm} onSubmit={submitMessage}>
                    
                <div className={contactCSS.contactForm_d}>
                        <br/>
                       
                         <input className={contactCSS.input} name='email' placeholder='E-mail' required='true'  onChange={(e) => setEmail(e.target.value)}/>
                    
                </div>
                     <div className={contactCSS.contactForm_d}>
                        <br/>                  
                         <input className={contactCSS.input} name='text' placeholder='Topic' required='true'  onChange={(e) => setTopic(e.target.value)}/>                 
                     </div>
              <div className={contactCSS.contactForm_d}>                                               
                   <textarea className={contactCSS.input} cols='40' rows='10' name='msg' placeholder='Message' required='true' onChange={(e) => setMessage(e.target.value)} />                    
              </div>
              <div className={contactCSS.contactForm_button}>
                    <button className={contactCSS.button}type='submit'>Send</button>

              </div>
                </form>
            </div>
        </div>
        </div>
    )
}
