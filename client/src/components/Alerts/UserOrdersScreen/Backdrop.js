
import React from 'react'
import backdrop from './Backdrop.module.css'
export const Backdrop_orders = (props) => {
    return (
        <div className={backdrop.backdrop} onClick={props.closeBackdrop}>
            
        </div>
    )
}
