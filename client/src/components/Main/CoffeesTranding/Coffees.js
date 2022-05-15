import React from 'react'
import coffeesCSS from './Coffees.module.css'
import {Coffee} from '../../Coffee/Coffee';
import {Swiper} from 'swiper/react/swiper';
import { SwiperSlide } from 'swiper/react/swiper-slide';
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper';
export const Coffees = (props) => {
    return (
        <div>
          <div className="row center">
          <div className={coffeesCSS.container}>
            <div className={coffeesCSS.header}>
              <h1 className={coffeesCSS.h1}>
                COFFEES
              </h1>
              <h1 className={coffeesCSS.span}>BestSellers</h1>
            </div>
            <div className={coffeesCSS.coffees}>
                <div className={coffeesCSS.swiper}>
                <Swiper style={{height:'100%',width:'100%'}}
                spaceBetween={2}
      slidesPerView={6}> 
       {props.coffees.map((coffee)=>(
              <SwiperSlide key={`${coffee._id}`} tag='li'><Coffee key={coffee._id} coffee={coffee}/></SwiperSlide>
            ))}
      </Swiper>
      </div>
            </div>
            <div className={coffeesCSS.divButton}>
            <button className={coffeesCSS.button}>SEE ALL COFFEES</button>
            </div>
            </div>

          </div>

        </div>
    )
}
