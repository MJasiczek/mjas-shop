import React from 'react'
import welcome2CSS from './Welcome2.module.css'
import AppleIcon from '@material-ui/icons/Apple';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ContactlessIcon from '@material-ui/icons/Contactless';
export const Welcome2 = (props) => {
    return (
        <div className={welcome2CSS.content}>
            <div className={welcome2CSS.hero_Content_Text}>
                    <div className={welcome2CSS.hero_text}>
                        <div className={welcome2CSS.c_text} style={{transform: `translateY(${props.offsetPageY2 *-.25}px)`}}>
                        <span className={welcome2CSS.brand_name}>New drop</span>
                        <h2 className={welcome2CSS.arrival_text}>Coming soon</h2>
                        <div className={welcome2CSS.footer_subscription_form} style={{justifyContent:'center',alignItems:'center',textAlign:'center', display:'block', position:'relative',width:'50%',margin:'auto', top:'5.5em', bottom:'5em', zIndex:1}}>
                       
                            
                       
                    </div>
                     </div>
                    </div>
                </div>
                <div className={welcome2CSS.controls} >
                <span className={welcome2CSS.dots} style={{color:'gray'}}>...</span>
                
                </div>
                
               
                
            </div>
            
   
    )
}
