import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false,message: 'Auth Error'});
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message: 'Invalid Token'});
    }
}

export default authMiddleware;