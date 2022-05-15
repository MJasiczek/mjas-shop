import React from 'react'
import loadboxCSS from './LoadingProd.module.css'
export const LoadingProd = () => {
    return (
        <div style={{position:'relative',width:'100%', height:'100%'}}>
            <div style={{width:'20%',height:'20%',justifyContent:'center',alignItems:'center', margin:'auto',transform:'translateY(40rem)',}}>
            <i className="fa fa-spinner fa-spin" style={{color:'white', textAlign:'center', fontroast:'4rem'}}></i>
            </div>
        </div>
    )
}
