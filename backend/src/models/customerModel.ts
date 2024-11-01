import mongoose, { Document, Schema } from "mongoose";

interface ICustomer extends Document {
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

const customerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, unique: true },
  phone: { type: String },
});

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
export default Customer;
