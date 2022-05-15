import React, {useState,useEffect} from 'react'
import { CoffeesNew } from '../../components/Main/CoffeesNew/CoffeesNew';
import { Welcome } from '../../components/Main/Welcome/Welcome';
import { Backdrop } from '../../components/WebElements/LoadingProd/Backdrop';
import { LoadingProd } from '../../components/WebElements/LoadingProd/LoadingProd';
import { MessageBlock } from '../../components/WebElements/MessageBlock/MessageBlock';
import mainCSS from './Main.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { listCoffees } from '../../redux/actions/coffeeActions';
export const Main = () => {
   
    
     const dispatch = useDispatch()
    const coffeeList = useSelector(state => state.coffeeList)
    const {coffees, loading: loadingElement, error: possibleError} = coffeeList;
    
  useEffect(() => {
    
  
    dispatch(listCoffees())
    
  }, [])
    
    return (
        <div className={mainCSS.main}>
            {loadingElement?(<><LoadingProd></LoadingProd> <Backdrop></Backdrop></>)
            :possibleError ?(<MessageBlock variant='danger'></MessageBlock>)
            :(<>
            <Welcome />
            <CoffeesNew coffees={coffees} />
           {/*  <Blend />*/}
           
            </> )
            }
          
           
        </div>
    )
}
