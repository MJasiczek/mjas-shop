import React from 'react'
import welcome1CSS from './Welcome1.module.css'
import AppleIcon from '@material-ui/icons/Apple';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ContactlessIcon from '@material-ui/icons/Contactless';
import { Link } from 'react-router-dom';
export const Welcome1 = (props) => {
    return (
        <div className={welcome1CSS.content}>
            <div className={welcome1CSS.hero_Content_Text}>
                    <div className={welcome1CSS.hero_text}>
                        <div className={welcome1CSS.c_text} style={{transform: `translateY(${props.offsetPageY2 *-.25}px)`}}>
                        <span className={welcome1CSS.brand_name}>SHOPLY</span>
                            <h2 className={welcome1CSS.arrival_text}>Coffee for you</h2>
                            
                            <div style={{justifyContent:'center',alignItems:'center',textAlign:'center', display:'block', position:'relative',width:'50%',margin:'auto', top:'5.5em', bottom:'5em', zIndex:1}}><button className={welcome1CSS.hero_button}><Link to='/shop'>Check it out!</Link></button>{/*<div className={welcome1CSS.jumper}><div className={welcome1CSS.wheel}><span className={welcome1CSS.arrow}></span></div></div>*/}</div>
                     </div>
                    </div>
                </div>
                <div className={welcome1CSS.controls} >
                <span className={welcome1CSS.dots} style={{color:'gray'}}>...</span>
               
                </div>
                
               
                
            </div>
            
   
    )
}
