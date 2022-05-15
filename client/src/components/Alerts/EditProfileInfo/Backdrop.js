import React from 'react'
import backdrop from './Backdrop.module.css'
export const Backdrop_edit_profile = (props) => {
    return (
        <div className={backdrop.backdrop} onClick={props.closeBackdrop}>
            
        </div>
    )
}
