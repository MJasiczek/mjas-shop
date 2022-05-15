import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LoadingProd } from '../../components/WebElements/LoadingProd/LoadingProd';
import { coffeeWindow, updateCurrentCoffee } from '../../redux/actions/coffeeActions';
import FileBase from 'react-file-base64';
import css from './CoffeeUpdate.module.css'
import { MessageBlock } from '../../components/WebElements/MessageBlock/MessageBlock';

export const CoffeeUpdate = (props) => {
    const coffeeID = props.match.params.id; 
    const dispatch = useDispatch();
    const [brand_name, setCoffeeName] = useState('');
    const [price, setCoffeePrice] = useState('');
    const [image, setCoffeeImage] = useState('');
    const [category, setCoffeeCategory] = useState('');
    const [inStock, setCoffeeInStock] = useState('');
    const [color, setCoffeeColor] = useState('');
    const [material, setCoffeeMaterial] = useState('');
    const [grammage, setCoffeeGrammage] = useState('');
    const [addons, setCoffeeAddons] = useState('');
    const [productionWhere, setProductionWhere] = useState('');
    const [description, setCoffeeDescription] = useState('');
    const [roastName, setCoffeeroastName] = useState('');
    const [roast, setCoffeeroast] = useState([]);

    const coffeeW = useSelector((state) => state.coffeeWindow);
    const {  loading, coffee, message} = coffeeW;

    const submitUpdateHandler =(e)=>{
        e.preventDefault();
        
        dispatch(updateCurrentCoffee({
            _id:coffeeID,
             brand_name,
             price, category, inStock, grammage, addons, productionWhere,image, description,roast,

        }))
       
            alert("Coffee updated")
    }
   
    const updateFieldChanged2 = index=>e=>{
      let newArr = [...roast];
      newArr[index].inStock = e.target.value;

      setCoffeeroast(newArr);
  }
    useEffect(() => {
        if (!coffee || coffee._id !== coffeeID ) {
           // dispatch({ type: COFFEE_UPDATE_RESET });
            dispatch(coffeeWindow(coffeeID));
          } else {
            setCoffeeName(coffee.brand_name);
            setCoffeePrice(coffee.price);
   
            setCoffeeImage(coffee.image);
            setCoffeeCategory(coffee.category);
            //setCoffeeInStock(coffee.roast[0].inStock);
            setCoffeeGrammage(coffee._Grammage);
            setCoffeeAddons(coffee._Addons);
            setProductionWhere(coffee._ProductionWhere);
            setCoffeeDescription(coffee.description);
            //setCoffeeroastName(coffee.roast[0].roastName);
            var a=[];
            coffee?.roast?.map((x)=>{
                a.push(x);
            })
            setCoffeeroast(a)
          }
    }, [coffee, dispatch, coffeeID])
    return (
        <div>
             <form className={css.form} onSubmit={submitUpdateHandler}>
        <div>
          <h1>Edit Coffee {coffeeID}</h1>
        </div>
        {message?<div id='snackbar' >{message}</div>:null}
        {loading ? (
          <LoadingProd/>
        ) :
        (
          <>
            <div>
              <label htmlFor="name">Coffee Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={brand_name}
                onChange={(e) => setCoffeeName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Coffee Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setCoffeePrice(e.target.value)}
              ></input>
            </div>
           {<div>
              <label htmlFor="image">Coffee Image </label>
              <FileBase type='file'  multiple={false} onDone={({base64})=>setCoffeeImage(base64)} />
           
            </div>}
           
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCoffeeCategory(e.target.value)}
              ></input>
            </div>
            
            <div>
              <label htmlFor="grammag">_Grammage</label>
              <input
                id="grammage"
                type="text"
                placeholder="Enter grammage"
                value={grammage}
                onChange={(e) => setCoffeeGrammage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="addons">_Addons</label>
              <input
                id="addons"
                type="text"
                placeholder="Enter addons"
                value={addons}
                onChange={(e) => setCoffeeAddons(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="ProductionWhere">_ProductionWhere</label>
              <input
                id="productionWhere"
                type="text"
                placeholder="Enter productionWhere"
                value={productionWhere}
                onChange={(e) => setProductionWhere(e.target.value)}
              ></input>
            </div>
            {roast?.map((x, index)=>
                (<><div>
                    <label htmlFor="roastName">roastName: <p style={{color:'orange'}}>{x.roastName}</p></label>
                  </div>
                  
                 
                  <div>
                    <label htmlFor="inStock">inStock ID: {x.roastName}</label>
                    <input
                      id="inStock"
                      type="text"
                      placeholder="Enter inStock"
                      onKeyPress={(e)=>{
                        if(!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                      value={x.inStock}
                      onChange={updateFieldChanged2(index)}
                    ></input>
                    
                  </div></>)
            )}
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setCoffeeDescription(e.target.value)}
              ></textarea>
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>
              <label></label>
              <button className={css.confirm} type="submit">
                Update
              </button>
              
            </div>
          </>
        )}
                
      </form>
        </div>
    )
}
