import React, {useRef, useState, useEffect} from 'react'
import loginCSS from './Login.module.css'
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { signIn } from '../../redux/actions/userActions';
import { MessageBlock } from '../../components/WebElements/MessageBlock/MessageBlock';
import {toast} from 'react-toastify'
toast.configure();

export const Login = (props) => {
   
   
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const history = useHistory()
    const dispatch = useDispatch()
    const loginSelector = useSelector((state)=>state.user.profile);
    const {message, result} = loginSelector;
    //const [message2, setMessage] = useState(message);

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
    /*const changeHandler = (e)=>{
        setData({...data,[e.target.name]: e.target.value })
    }*/
    const userLoginHandler=(e)=>{
        e.preventDefault();    
        var mailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.match(mailValidation)){
            dispatch(signIn({email, password}))   
            setError(false)
        }else{
            setError(true) 
        }
        
    }


    useEffect(() => {
        if(result){
            //history.push('/');
            //history.push('/')
            history.push(redirect)
        }
    }, [result, history])
    return (
        <div className={loginCSS.login}>
            <form className={loginCSS.loginContainer} onSubmit={userLoginHandler}>
            <div className={loginCSS.loginTitle}>
                <h5>Sign-in</h5>
                </div>
             {message? <div id='snackbar'>{message}</div>:null}
             {error?<div id='snackbar' >Invalid email</div>:null}
             <div className={loginCSS.loginFields}>
             <div className={loginCSS.loginName}>
                 <PersonIcon />
                <input className={loginCSS.input} name='email' onChange={(e)=>setEmail(e.target.value)} /*ref={email_ref}*/placeholder="Email" type='email'required/>
                </div>
                <div className={loginCSS.loginPassword}>
                <LockIcon />
                <input  className={loginCSS.input} name='password'  onChange={(e)=>setPassword(e.target.value)} /*ref={password_ref}*/ placeholder="Password" type='password'required/>
                </div>
            </div>
            <div className={loginCSS.loginControls}>
                <button className={loginCSS.button}type='submit'>Sign-In</button>
                </div>
                <div className={loginCSS.loginRegister}>
                    <p style={{color:'#afb1be'}}>New here? <Link to={`/register?redirect=${redirect}`} style={{color:'rgba(219, 173, 46, 0.5);'}}>Create your account</Link></p>
                </div>
            </form>
            </div>
            
             
    
    )
}
