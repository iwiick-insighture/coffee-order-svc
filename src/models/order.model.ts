import mongoose from "mongoose";
import { CartSchema } from "./cart.model";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _id: {
    type: String,
    required: true,
    trim: true,
  },

  userId: {
    type: String,
    required: true,
    trim: true,
  },

  items: [CartSchema],

  createdAt: {
    type: String,
    default: new Date().toISOString(),
    trim: true,
  },
});

export default mongoose.model("order", OrderSchema);
