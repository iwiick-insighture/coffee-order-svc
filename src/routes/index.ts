import {
  healthHandler,
  createOrdersHandler,
  getUserOrdersHandler,
  deleteOrderByIdHandler,
  deleteOrdersHandler,
} from "../handlers";

const express = require("express");
const router = express.Router();

router.get("/health", healthHandler);
router.get("/:userId", getUserOrdersHandler);
router.post("/:userId", createOrdersHandler);
router.delete("/:userId/:orderId/", deleteOrderByIdHandler);
router.delete("/:userId", deleteOrdersHandler);

export default router;
