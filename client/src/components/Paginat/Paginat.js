import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export const Paginat = ({coffeeOnPage, totalAmountOfCoffee, pagination}) => {
    const coffeeList = useSelector(state=>state.coffeeList);
    const {coffee} = coffeeList;
    const pageNum=[];
    for(let i=1; i<=Math.ceil(totalAmountOfCoffee/coffeeOnPage);i++){
        pageNum.push(i)
    }
   
    return (
        <>
        <nav style={{margin:'auto', width:100, listStyle:'none'}}>
        <ul className='pagination' style={{listStyle:'none', display:'flex', justifyContent:'space-around'}}>
        {pageNum.map(x => (
          <li key={x} className='page-item' style={{background:'white', width:'50%', textAlign:'center', margin:'0.2rem', cursor:'pointer'}}>
            <a onClick={()=> pagination(x)} style={{color:'black'}} className='page-link'>
              {x}
            </a>
          </li>
        ))}
      </ul>
        </nav>
        </>
    )
}
