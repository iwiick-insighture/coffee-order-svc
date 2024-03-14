import axios from "axios";
import Order from "../models/order.model";
import { getPrefixedUUID } from "../utils";
import configData from "../configs/config";
import { CartItem } from "../common/cart.dto";
import { RedisService } from "./redis";

export const getUserOrders = async (userId: string): Promise<any> => {
  const data = await Order.aggregate([
    {
      $match: { userId },
    },
  ]).exec();

  return data;
};

// TODO Pub sub should be implemented here
export const createUserOrder = async (userId: string): Promise<any> => {
  try {
    const { data: res } = await axios.get(
      `${configData.services.cartSvcBaseUrl}/${userId}`
    );

    const items: CartItem[] = res.data || [];

    if (items.length > 0) {
      const newOrder = new Order({
        _id: getPrefixedUUID(),
        userId,
        items,
      });

      await RedisService.getClient()
        .publish("order", JSON.stringify(newOrder))
        .then(() => {
          console.log(`New Order Published to 'order' channel`);
        })
        .catch((err) => {
          console.error(err);
        });

      return await newOrder.save();
    } else {
      undefined;
    }
  } catch (err) {
    throw err;
  }
};

export const deleteOrderById = async (orderId: string): Promise<any> => {
  return await Order.findByIdAndDelete(orderId);
};

export const deleteAllOrders = async (userId: string): Promise<any> => {
  return await Order.deleteMany({
    userId,
  });
};
