import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an e-mail address"],
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },

  fullname: {
    trim: true,
    type: String,
    required: [true, "Please enter your full name"],
    minLength: [3, "Full name must be at least 3 characters long"],
    maxLength: [128, "Full name must be at most 50 characters long"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = models.User || model("User", UserSchema);
export default User;
