import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())


//use body parser
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use((req: any, res: any, next: any) => {
  console.log(req.path + " " + req.method);
  next();
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || "") 
  .then(() =>
    app.listen(port, () => {
      console.log("Connected to MongoDB");
      console.log(`Server is running on port ${port}`);
    })
  )
  .catch((err: any) => console.log(err));
