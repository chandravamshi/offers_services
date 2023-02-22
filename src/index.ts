// this shim is required
import {
  createExpressServer,
  useContainer,
  useExpressServer,
} from "routing-controllers";
import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { Container } from "typedi";
import { OfferController } from "./controllers/OfferController";
import { Settings } from "luxon";
useContainer(Container);
let compression = require("compression");
var morgan = require("morgan");

Settings.defaultZone = "utc";
//const crypto = require('crypto');
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  defaultErrorHandler: false,
});

useExpressServer(app, {
  controllers: [OfferController],
});

app.use(morgan(process.env.LOG_FORMAT || "common"));
app.use(compression());

export const prisma = new PrismaClient();

app.listen(5000, () => {
  console.log("started server at port 5000");
});
