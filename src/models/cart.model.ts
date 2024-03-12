import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const CartSchema = new Schema({
  // userId_coffeId = _id
  _id: {
    type: String,
    required: true,
    trim: true,
  },

  quantity: {
    type: Number,
    required: true,
    trim: true,
  },

  userId: {
    type: String,
    required: true,
    trim: true,
  },

  coffeeId: {
    type: String,
    default: true,
  },

  createdAt: {
    type: String,
    default: new Date().toISOString(),
    trim: true,
  },
});

export default mongoose.model("cart", CartSchema);
