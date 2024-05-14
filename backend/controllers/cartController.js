import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).json({success:true,message: 'Item added to cart'});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: 'Internal Server Error while adding to cart'});
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: 'Internal Server Error while getting cart items'});
    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]){
            cartData[req.body.itemId] -= 1;
            if(cartData[req.body.itemId] === 0){
                delete cartData[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message: 'Item removed from cart'});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: 'Internal Server Error while removing from cart'});
    }
}


export { addToCart, getCart, removeFromCart }