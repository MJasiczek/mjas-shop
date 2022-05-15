import React from 'react'
import { Link } from 'react-router-dom';
import coffeeCSS from './Coffee.module.css'

export const Coffee = (props) => { {
    
    const {coffee} = props;

    return (
        <div key={coffee._id} className={coffeeCSS.card}>
              <Link to={`/category=${coffee.category}/${coffee._id}`}>
               
                {<img className={coffeeCSS.medium2_home} src={coffee.image} alt="coffee" />}
              </Link>
              <div className={coffeeCSS.card_body}>
              <Link to={`/category=${coffee.category}/${coffee._id}`}>
                  <h2>{coffee.brand_name}</h2>
                </Link>
                <div className={coffeeCSS.price}>${coffee.price}</div>
              </div>
            </div>
    )
}}


