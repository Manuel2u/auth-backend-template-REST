import cors from "cors";
require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(cors());

import bodyParser from "body-parser";

app.use(express.json());
app.use(bodyParser.json())


//use body parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.urlencoded({ extended: true }));


app.use((req: any, res: any, next: any) => {
  console.log(req.path + " " + req.method);
  next();
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || "") 
  .then(() =>
    app.listen(process.env.PORT || 4000, () => {
      console.log("Connected to MongoDB");
      console.log(`Server is running on port 4000`);
    })
  )
  .catch((err: any) => console.log(err));
