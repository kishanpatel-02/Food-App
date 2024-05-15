import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req,res) => {

    const frontend_url = "http://localhost:5174";
    try{
        // console.log(req.body);
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        // console.log(newOrder);
        await newOrder.save();
        // console.log("data save hogaya database mein");
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))
        
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
        // console.log("yaha hoon mein");
        // console.log(stripe.checkout.sessions);
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        // console.log(session);
        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Order Failed"});
    }
};

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Payment Failed"});
    }
}


//user orders for frontend
const userOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to get orders"});
    }
}


// Listing order for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to get orders"});
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to update status"});
    }
}

export {placeOrder,verifyOrder,userOrder,listOrders,updateStatus}