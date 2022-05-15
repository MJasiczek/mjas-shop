import React from 'react'
import messageCSS from'./MessageBlock.module.css'
export const MessageBlock = (props) => {
    return (
        <div className={`alert alert-${props.variant || `info`}`}> 
            {props.children}
        </div>
    )
}
