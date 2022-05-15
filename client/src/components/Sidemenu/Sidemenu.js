
import React, {useState} from 'react'
import { Link, Route } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';

import AppleIcon from '@material-ui/icons/Apple';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ContactlessIcon from '@material-ui/icons/Contactless';
import sidemenuCSS from './Sidemenu.module.css'
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { Backdrop_search } from '../Alerts/SearchBar/Backdrop';
import { Modal_search } from '../Alerts/SearchBar/Modal';
export const Sidemenu = (props) => {
    const user = useSelector(state => state.user.profile.token)
    const [dropSearchBar, setDropSearchBar]=useState(false);
    const updateBackdropSearch = (e)=>{
        e.preventDefault();
        setDropSearchBar(!dropSearchBar);
    }
      const backdropSearch = ()=>{
        setDropSearchBar(false);
    }
    return (
        <>{   dropSearchBar?
            <Backdrop_search closeBackdrop={backdropSearch}/>:null}
        {
          dropSearchBar?
          <Route render={({history})=>(
            <Modal_search closeBackdrop={backdropSearch} history={history} />
          )}></Route>:null}  
        <aside className={sidemenuCSS.sidemenu} style={{display: props.open? 'grid':'none', opacity: props.open?'100%':'0', top: props.open?'0':'-100%'}}>
        <div className={sidemenuCSS.icon}>
        <CloseIcon onClick={props.toggleMenu}/>
        </div>
      
        <div className={sidemenuCSS.sidemenuWrapper} style={{display:'grid'}}>
        <nav className={sidemenuCSS.nav}>
                <li className={sidemenuCSS.li} ><Link to='/'>Home </Link>  </li>
                <li className={sidemenuCSS.li}><Link to='/shop'>Shop</Link></li>
                <li className={sidemenuCSS.li} ><Link to ='/contact'>Contact</Link> </li>
                <li className={sidemenuCSS.li} ><Link to ='/cart'>Cart</Link> </li>
                <li className={sidemenuCSS.li}><Button variant="outlined" style={{color:'gray',backgroundColor:'transparent', border:'none'}} onClick={updateBackdropSearch}>SEARCH</Button></li>
                {user? 
                                <li className={sidemenuCSS.li} ><Link to ='/dashboard'>My Account</Link> </li>
                          :
                          <li className={sidemenuCSS.li} ><Link to ='/signin'>Sign in</Link> </li>
                        }


              
                <span style={{color:'gray'}}>...</span>
            </nav>
            
        </div>
    </aside>
    </>
    )
}
