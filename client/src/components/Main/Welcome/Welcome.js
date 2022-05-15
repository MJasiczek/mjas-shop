import React, {useState, useEffect} from 'react';
import {Swiper} from 'swiper/react/swiper';
import { SwiperSlide } from 'swiper/react/swiper-slide';
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper';
import 'swiper/swiper-bundle.css'
import welcomeCSS from './Welcome.module.css'
import AppleIcon from '@material-ui/icons/Apple';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ContactlessIcon from '@material-ui/icons/Contactless';
import { Welcome1 } from '../SwiperWelcomePack/Welcome1';
import { Welcome2 } from '../SwiperWelcomePack/Welcome2';



SwiperCore.use([Pagination, Autoplay])
export const Welcome = () => {
   
   
    const [offsetPageY2, setOffsetPageY] = useState(0);


    useEffect(()=>{
        const handleScrollY=()=>{
            setOffsetPageY(window.pageYOffset);
        }
        window.addEventListener('scroll', handleScrollY);
        handleScrollY();
       
        return ()=> window.removeEventListener('scroll', handleScrollY);
    },[offsetPageY2])
   
    useEffect(() => {
       const play = ()=>{

       }
    }, [])
    

    return (
        <div className={welcomeCSS.welcome}>
             <div className={welcomeCSS.hotStuff}>
                <p className={welcomeCSS.hotStuff_text}>Hot Stuff</p>
            </div> 
            <div className={welcomeCSS.content} >
                <div className={welcomeCSS.swiper} >
                <Swiper style={{height:'100%',width:'100%'}}
      spaceBetween={50}
      slidesPerView={1}
      pagination
      autoplay={{delay:11000,disableOnInteraction: false}}
    >
     <SwiperSlide key={`1`} tag='li'  style={{width:'100%',height:'100%', listStyle:'none'}}><Welcome1 offsetPageY2={offsetPageY2} /></SwiperSlide>
      <SwiperSlide key={`2`} tag='li'  style={{width:'100%',height:'100%', listStyle:'none'}}><Welcome2 offsetPageY2={offsetPageY2}/></SwiperSlide>
      
    </Swiper>
    <h3 className={welcomeCSS.l_text}>Shoply - Your Coffee</h3>
                        <h3 className={welcomeCSS.r_text}>Since - 2020</h3></div>
                
                {}</div>
           
           
        </div>
    )
}
