import React from 'react'
import backdrop from './Backdrop.module.css'
export const Backdrop = (props) => {
    return (
        <>
        {props.sideBarToggle? (<div className={backdrop.backdrop} onClick={props.click}>
            
            </div>): (<></>)}
        </>
    )
}
