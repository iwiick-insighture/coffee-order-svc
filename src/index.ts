import express from "express";
import configData from "./configs/config";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { connectToMongoDB } from "./configs/db";

connectToMongoDB()
  .then(() => {
    console.log("MongoDB Connected and Initiallized");
    const app = express();
    app.use(express.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);

    app.listen(configData.port, () => {
      console.log(`coffee-order-svc started on port :: ${configData.port}`);
    });
  })
  .catch((err) => {
    console.error("Error Initializing DB", err);
  });
