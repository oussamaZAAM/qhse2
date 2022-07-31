import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/users.js';
import OrganismRouter from "./routes/organisms.js";
import ProductRouter from "./routes/products.js";
import multer from "multer"
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
//__dirname sert a donne le path au root en dependant sur la machine locale dont on execute ce code.
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
app.use("/images", express.static(path.join(__dirname, "public/images")));//pour donner l'acces aux images apartir du backend.
app.use("/api/user", userRouter);
app.use("/api/organism", OrganismRouter);
app.use("/api/product", ProductRouter);

const CONNECTION_URL= 'mongodb://localhost:27017/ayoub';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))).catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);