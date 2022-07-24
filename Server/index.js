import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/users.js';
import OrganismRouter from "./routes/organisms.js";
import ProductRouter from "./routes/products.js";

const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


app.use("/api/user", userRouter);
app.use("/api/organism", OrganismRouter);
app.use("/api/product", ProductRouter);

const CONNECTION_URL= 'mongodb://localhost:27017/ayoub';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))).catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);