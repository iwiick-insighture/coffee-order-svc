import express from "express";
import configData from "./configs/config";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { connectToMongoDB } from "./configs/db";
import axios from "axios";
import { RedisService } from "./services/redis";

// Connecting to MongoDB
connectToMongoDB()
  .then(() => {
    console.log("MongoDB Connected and Initialized");

    // Checking Redis Server Availability
    RedisService.getClient()
      .ping()
      .then(() => {
        // Checking the Availability of the Cart Service
        axios
          .get(`${configData.services.cartSvcBaseUrl}/health`)
          .then(() => {
            const app = express();
            app.use(express.json());
            app.use(
              bodyParser.urlencoded({
                extended: true,
              })
            );
            app.use(bodyParser.json());
            app.use(cors());
            app.use((req, res, next) => {
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
              next();
            });
            app.use(router);

            app.listen(configData.port, () => {
              console.log(
                `coffee-order-svc started on port :: ${configData.port}`
              );
            });
          })
          .catch((err) => {
            console.error("Cart Service Is Unavailable :: ", err.message);
          });
      })
      .catch((err) => {
        console.error("Redis Server Unavailable :: ", err.message);
      });
  })
  .catch((err) => {
    console.error("Error Initializing DB ::", err.message);
  });
