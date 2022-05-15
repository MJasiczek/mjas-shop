import React, {useEffect, useState} from 'react'
import { Coffee } from '../../components/Coffee/Coffee'

import coffeePageCSS from './CoffeePage.module.css';

import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { coffeeWindow } from '../../redux/actions/coffeeActions';
import { addToCart } from '../../redux/actions/cartActions';



export const CoffeePage = (props) => {
   // const coffeeId = data.coffees.find((coffee)=>coffee._id===props.match.params.id)
   const coffeeId = props.match.params.id;
    const dispatch = useDispatch();
    const [helper, setHelper] = useState(null)
    const chosenCoffee = useSelector(state=>state.coffeeWindow)
    const{coffee} = chosenCoffee;
    const [proast, setProast] = useState('')
    const [pID, setPID] = useState('')
    const [category, setCategory] = useState('')


    const [quantity, setQuantity] = useState(0);
    const addToCartEvent = ()=>{
        setCategory(coffee.category);
       
      // console.log(category)
        console.log(quantity)
        dispatch(addToCart(coffeeId, pID, quantity, proast, category))
    }

    

    useEffect(()=>{
        
            dispatch(coffeeWindow(coffeeId))

       
    },[])

   useEffect(()=>{
       
    pID? coffee?.roast?.map((e)=>{  
            let foo=[];
            if(e._id==pID){
                    setProast(e.roastName)         
                for(let i=1; i<=e.inStock;i++){
                   foo.push(i)
                  }
             
               setHelper(foo.map((item)=>
                  (<option value={item} key={item}>{item}</option>)
                ))
                }}):
    setHelper(null)
        
        
      console.log(pID)
      
   },[pID])
  
    if(!coffee){
        return <div className={coffeePageCSS.fail}><p style={{color:'white', padding:15}}>Sorry, we couldn't find a proper item, please try again later!</p>
       
        </div>
    }
    return (
        <div className={coffeePageCSS.wrapper}>
            <div className={coffeePageCSS.trail}><Link to='/' >Homepage</Link> <span style={{fontroast:15,color:'gray', paddingLeft:5,paddingRight:5}}>></span> <Link style={{color:'#ff8000'}} to={`/category=${coffee.category}/${coffee._id}`}>{coffee.brand_name}</Link> </div>
           <div className={coffeePageCSS.coffeePage}>
               <div className={coffeePageCSS.col1}>
                {<img className={coffeePageCSS.img} src={coffee.image} alt={coffee.name}></img>}
               </div>
               <div className={coffeePageCSS.col2}>
                   <ul style={{listStyle:'none'}}>
                       <li>
                           <h1 style={{fontroast:'3rem', letterSpacing:1}}>{coffee.brand_name}</h1>
                       </li>
                       <li>
                           Price: ${coffee.price}
                       </li>
                       <li>
                         <p>{coffee.description}</p>
                       </li>
                       <li>
                         <ul style={{listStyle:'disc'}}>
                             <li>Grammage: <span style={{color:'#ff8000'}}>{coffee._Grammage}</span></li>
                             <li>Addons: <span style={{color:'#ff8000'}}>{coffee._Addons}</span></li>
                         </ul>
                       </li>
                     
                   </ul>
               
                   <div className={coffeePageCSS.desc}>
                       <ul style={{listStyle:'none'}}>
                           
                           
                           <li>
                               <div className="row">
                                   <div>Roast Type:</div>
                                   <div className={coffeePageCSS.roastButt} >
                                   <select /*value = {pID}*/ onChange={(e)=>{ setPID(e.target.value)}}>
                                    <option></option>
                                       {coffee?.roast?.map((x)=>(
                                           <option  disabled={x.inStock<=0?true:false} value={x._id} id={x._id} key={x._id}>{x.roastName}</option>
                                            
                                           ))
                                   }</select></div>
                               </div>
                           </li>
                           <li>
                            <div>Quantity</div>
                            <select /*value = {quantity}*/ onChange={((e)=> setQuantity(e.target.value))}>
                                <option ></option>
                                {
                                    helper
                                   /* [...Array(e.inStock).keys()].map((item) =>
                                    (<option value={item+1} key={item+1}>{item+1}</option>)
                                )*/
                                    /*proast? coffee?.roast?.map((e)=>{
                                        let foo=[];
                                        if(e.roastName==proast){
                                                         
                                            for(let i=0; i<=e.inStock;i++){
                                               foo.push(i)
                                              }
                                          // foo.map((item)=>console.log((<option value={item+1} key={item+1}>{item+1}</option>)))
                                            foo.map((item)=>
                                                (<option value={item+1} key={item+1}>{item+1}</option>)
                                            )
                                           /* [...Array(e.inStock).keys()].map((item) =>
                                        console.log(<option value={item+1} key={item+1}>{item+1}</option>)
                                    )
                                        }
                                    })
                                    : <option>nothing here</option>*/
                                   /* [...Array(coffee.inStock).keys()].map((item) =>
                                        (<option value={item+1} key={item+1}>{item+1}</option>)
                                    )*/
                                    /*coffee?.roast?.map((x)=>{
                                        if(x.roastName==proast){
                                           [...Array(x.inStock).keyes()].map((item)=>
                                                (<option value={item+1} key={item+1}>{item+1}</option>)

                                            )}else{
                                                (<option>nfs</option>)

                                            }
                                        }
                                    )*/
                                   /*[...Array(coffee.roast.inStock).keys()].map((item) =>
                                    (<option value={item+1} key={item+1}>{item+1}</option>)
                                )*/
                               
                                    
                                }
                            </select>
                        </li>
                        <li>
                            <label/>
                        </li>
                           <li>
                            {/*<button disabled = {quantity <=0 || quantity=='undefined' || quantity==null? true: false}className={coffeePageCSS.button} onClick={coffee.inStock <=0? null:addToCartEvent}>Add to Cart</button>*/}
                            <button disabled = {quantity <=0 ? true: false}className={coffeePageCSS.button} onClick={coffee.inStock <=0? null:addToCartEvent}>Add to Cart</button>

                        </li>
                       
                           
                       </ul>
                   </div>
               </div>
           </div>
        </div>
    )
}
