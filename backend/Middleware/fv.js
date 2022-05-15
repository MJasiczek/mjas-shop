
export const fv =(fvData)=>{
    
    const today = new Date();
    return `
        <!doctype html>
        <html>
           <head>
              <meta charset="utf-8">
              <title>PDF Shoply FV</title>
           </head>
           <body>
           <div >
           <ul>
                <li> Date:  ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</li>
                <li> Buyers Name: ${fvData.shippingInfo.yourName}</li>
                <li> Buyers Address: ${fvData.shippingInfo.yourAddress}, ${fvData.shippingInfo.yourCity},  ${fvData.shippingInfo.yourPostCode},  ${fvData.shippingInfo.yourCountry} </li>
                <li> Order ID: ${fvData._id}</li>
                </ul>
              
                </div>
                <div>
                    <p>Your orders: </p>
                    ${fvData.userOrders.map(e=>`
                    <ul> 
                    <li>Brand name: ${e.brand_name}</li>
                    <li>Roast Type: ${e.roast}</li>
                    <li>Quantity: ${e.quantity}</li>
                    <li>ID: ${e._id}</li>
                    <li>Price: ${e.price}</li>
                    </ul>
                    `)}
                </div>
            <div>
            <h1>Shipping price:$ ${fvData.shippingP}</h1>
              <h1>Total price:$ ${fvData.fullP.toFixed(2)}</h1>
           </div>
        </body>
        </html>`
};