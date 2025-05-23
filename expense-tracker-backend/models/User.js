import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Added name field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
