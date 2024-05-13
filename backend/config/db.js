import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kishan:Kishan2002@cluster0.lrxcmok.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
