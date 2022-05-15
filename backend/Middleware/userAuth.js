import jwt from 'jsonwebtoken'

const userAuth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        //const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

        let decodedData;

        if(token){
            decodedData = jwt.verify(token, 'secret');

            req.user= decodedData; //decodedData?.id;
        }
        next();
    } catch (error) {
        
        console.log(`${error}    +++ no token`)
    }
}

export default userAuth;