import React,{useRef, useState, useEffect} from 'react'
import registerCSS from './Register.module.css'
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email'
import { useHistory } from 'react-router';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';
import {MessageBlock} from '../../components/WebElements/MessageBlock/MessageBlock'

export const Register = (props) => {
    
   
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [error, setError] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const registerSelector = useSelector((state)=>state.user.profile);
    const {message, result} = registerSelector;
  
    
    const userRegisterHandler = (e)=>{
        e.preventDefault();
        
        var mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(password.length>5){
            if(password === cPassword){
                if(email.match(mailValidation))
                    {
                        dispatch(register({email, username, password}));
                        setError(false)
                    }
                    else{
                        setError(true);
                    }
               
            }else{
                setError('Wrong password')
            }
        }
        else{
            setError('Password at least 6 characters')
        }
        
    }
    useEffect(() => {
        if(result && !result.message){
            history.push('/')
        }
       
       
      
    }, [result])
    return (
        <div className={registerCSS.login}>
        <form className={registerCSS.loginContainer} onSubmit={userRegisterHandler}>
        <div className={registerCSS.loginTitle}>
            <h5>Sign-Up</h5>
            </div>
        {message?<div id='snackbar'>{message}</div>: null}
        {error? <div id='snackbar'>{error}</div>:null}

         <div className={registerCSS.loginFields}>
         <div className={registerCSS.loginName}>
         <EmailIcon />
         <input className={registerCSS.input} name='email' onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type='mail'required/>
         </div>
         <div className={registerCSS.loginName}>
             <PersonIcon />
            <input className={registerCSS.input} name='name' onChange={(e)=>setName(e.target.value)} placeholder="Username" type='text'required/>
            </div>
            <div className={registerCSS.loginPassword}>
            <LockIcon />
            <input  className={registerCSS.input} name='password' onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type='password'required/>
            <LockIcon />
            <input  className={registerCSS.input} name='cPassword' onChange={(e)=>setCPassword(e.target.value)} placeholder="Again Password" type='password'required/>
            </div>
        </div>
        <div className={registerCSS.loginControls}>
            <button className={registerCSS.button}type='submit'>Sign-Up</button>
            </div>
            <div className={registerCSS.loginRegister}>
                    <p style={{color:'#afb1be'}}>Go back: <Link to={`/signin`} style={{color:'rgba(219, 173, 46, 0.5);'}}>Signin to your account</Link></p>
                </div>
        </form>
        </div>
    )
}
