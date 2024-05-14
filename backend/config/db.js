import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kishan292002:Kishan2002@cluster0.xzgikgi.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
