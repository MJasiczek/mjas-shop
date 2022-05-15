import React, {useState, useEffect} from 'react'

import {Coffee} from '../../Coffee/Coffee';
import coffeesNewCSS from './CoffeesNew.module.css'
import {Swiper} from 'swiper/react/swiper';
import { SwiperSlide } from 'swiper/react/swiper-slide';
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper';

SwiperCore.use([Pagination])
export const CoffeesNew = (props) => {

 


    return (
 <div>          
          <div className="row center">
            <div className={coffeesNewCSS.container}>
            <div className={coffeesNewCSS.header}>
              <h1 className={coffeesNewCSS.h1}>
                NEW COFFEES
              </h1>
              <h1 className={coffeesNewCSS.span}>more then just a coffee</h1>
            </div>
              <div className={coffeesNewCSS.coffees}>
                <div className={coffeesNewCSS.swiper}>
                <Swiper style={{height:'95%',width:'95%'}}
                spaceBetween={20}
      slidesPerView={3}
      pagination> 
       {props.coffees.map((coffee)=>(
              <SwiperSlide key={`${coffee._id}`} tag='li'><Coffee key={coffee._id} coffee={coffee}/></SwiperSlide>
       ))}
      </Swiper>
      </div>
            </div>
            {/*<div className={coffeesNewCSS.divButton}>
            <button className={coffeesNewCSS.button}>SEE ALL CoffeeS</button>
       </div>*/}
            </div>
          </div>
        
            
</div>
    )
}
