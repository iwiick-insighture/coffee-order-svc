import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { ApiResponse } from "../common/api-response.dto";
import {
  createUserOrder,
  getUserOrders,
  deleteOrderById,
  deleteAllOrders,
} from "../services";
import configData from "../configs/config";

export const healthHandler = (_: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json({
    message: `coffee-order-svc is up and running on port :: ${configData.port}`,
  } as ApiResponse);
};

export const getUserOrdersHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await getUserOrders(userId);
    res.status(HttpStatusCode.Ok).json({
      message: `User Orders Retrieved :: ${userId}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      error: err,
    } as ApiResponse);
  }
};

export const createOrdersHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await createUserOrder(userId);
    if (!!data) {
      res.status(HttpStatusCode.Ok).json({
        message: `Order Created :: ${userId}`,
        data,
      } as ApiResponse);
    } else {
      res.status(HttpStatusCode.BadRequest).json({
        message: `user does not have anything to checkout :: ${userId}`,
        data,
      } as ApiResponse);
    }
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      error: err,
    } as ApiResponse);
  }
};

export const deleteOrderByIdHandler = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const data = await deleteOrderById(orderId);
    res.status(HttpStatusCode.Ok).json({
      message: `Order Deleted by Id :: ${orderId}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      error: err,
    } as ApiResponse);
  }
};

export const deleteOrdersHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await deleteAllOrders(userId);
    res.status(HttpStatusCode.Ok).json({
      message: `All Orders Deleted :: ${userId}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      error: err,
    } as ApiResponse);
  }
};
