import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Button } from '@material-ui/core';
import footerCSS from './Footer.module.css';
import { useDispatch } from 'react-redux';
export const Footer = () => {
    
    
    return (
        
    
    <footer className={footerCSS.footer}>
       
            <div className={footerCSS.container}>
            <div className={footerCSS.centerFooterContainer1}>
                <ul className={footerCSS.ul1}>
                    <span className={footerCSS.span}>Web</span>
                    <li className={footerCSS.li}><Link to='/'>Homepage</Link></li>
                    <li className={footerCSS.li}><Link to='/shop'>Shop</Link></li>
                    <li className={footerCSS.li}><Link to='/contact'>Contact</Link></li>
                </ul>
               
                </div>
          
            </div>
        </footer>
    

     
    )
}
