import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db config
connectDB();


// api endpoints 
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));



app.get("/", (req, res) => res.send("API Working"));

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));



// mongodb+srv://kishan:<password>@cluster0.iuoigg1.mongodb.net/?