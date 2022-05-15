import React,{useEffect, useState} from 'react'
import headerCSS from './Header.module.css';
import {Link, Route} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from 'react-redux'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Button, IconButton} from '@mui/material'
import DashboardIcon from '@material-ui/icons/Dashboard';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Backdrop_search } from '../Alerts/SearchBar/Backdrop';
import { Modal_search } from '../Alerts/SearchBar/Modal';

export const Header = ({click, toggleMenu, history}) => {

  const [dropSearchBar, setDropSearchBar]=useState(false);
    const user = useSelector(state => state.user.profile.token)
    const prof = useSelector((state) => state.user.profile);
    const {result} = prof;
    //const admin = useSelector(state => state.user.profile.result)
    
    const cartNumber = useSelector(state=>state.cart)
    const {cartYourItems} = cartNumber;
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
        <header className={headerCSS.row}>
        <div>
          
          <Link className={headerCSS.brand} to="/"><span className={headerCSS.brand_name}>SHOPLY</span></Link>
        </div>
        <div className={headerCSS.nav}>
                  <li className={headerCSS.nav_option} id='home'><Link  to={`/`}  style={{textDecoration: 'none'}}><Button variant="outlined" style={{backgroundColor:'transparent', border:'none'}}><span className={headerCSS.text_span_x} >HOME</span></Button></Link></li> 
                    <li className={headerCSS.nav_option} id='shop'> <Link  to={`/shop`}  style={{textDecoration: 'none'}}><Button variant="outlined" style={{backgroundColor:'transparent', border:'none'}}><span className={headerCSS.text_span_y} >SHOP</span></Button></Link></li> 
                   <li className={headerCSS.nav_option}id='contact'><Link  to={`/contact`}  style={{textDecoration: 'none'}}><Button variant="outlined" style={{backgroundColor:'transparent', border:'none'}}><span  className={headerCSS.text_span_z}>CONTACT</span></Button></Link></li>
                   <li className={headerCSS.nav_option} id='query'><Button variant="outlined" style={{backgroundColor:'transparent', border:'none'}} onClick={updateBackdropSearch}><span  className={headerCSS.text_span_s}>SEARCH</span></Button></li>

                   <li className={headerCSS.nav_option} id='cart'><Button variant='outlined' style={{borderColor:'gray', boxShadow:'0px 5px 10px #000'}} onClick={click}><ShoppingCartIcon style={{color:'white', paddingRight:4,fontroast:20}}></ShoppingCartIcon><span style={{color:'white', fontroast:'1.5rem'}}>CART [<span style={{fontroast:'1.5rem', color:'#dbad2e'}}>{cartYourItems.length==null?0 : (`${cartYourItems.length}`)}</span>]</span></Button> </li>
                  {result ?
                  <li className={headerCSS.nav_option} id='signin'><Link className={headerCSS.signin} to='/dashboard'><Button variant='outlined' style={{borderColor:'gray', backgroundColor:'#2e2e2e', boxShadow:'-1px 5px 10px #000'}}><DashboardIcon style={{color:'white', paddingRight:4, fontroast:20}}/><span style={{color:'white', fontroast:'1.5rem'}}>My Account</span></Button></Link></li>
                  :
                  <li className={headerCSS.nav_option} id='signin'><Link className={headerCSS.signin} to='/signin'><Button variant='outlined' style={{borderColor:'gray', backgroundColor:'#2e2e2e', boxShadow:'-1px 5px 10px #000'}}><PersonOutlineIcon style={{color:'white', paddingRight:4, fontroast:20}}></PersonOutlineIcon><span style={{color:'white', fontroast:'1.5rem'}}>Sign in</span></Button></Link></li>
                
                }
                
                 
              
        </div>
        <div className={headerCSS.mobileIcon}>
                <MenuIcon onClick={toggleMenu}/>
            </div>
   
      </header>
      </>
    )
}
