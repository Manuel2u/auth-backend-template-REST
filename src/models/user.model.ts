import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: [6, "Please make sure your password is more than 6 characters"],
    required: true,
    max: [10, "please make sure the password is 10 characters maximum"],
  },
});

export default mongoose.model("User", userSchema);
