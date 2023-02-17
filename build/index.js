"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// this shim is required
const routing_controllers_1 = require("routing-controllers");
const client_1 = require("@prisma/client");
require("reflect-metadata");
const typedi_1 = require("typedi");
const OfferController_1 = require("./controllers/OfferController");
(0, routing_controllers_1.useContainer)(typedi_1.Container);
let compression = require("compression");
var morgan = require("morgan");
//const crypto = require('crypto');
// creates express app, registers all controller routes and returns you express app instance
const app = (0, routing_controllers_1.createExpressServer)({
    defaultErrorHandler: false,
});
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [OfferController_1.OfferController],
});
app.use(morgan(process.env.LOG_FORMAT || "common"));
app.use(compression());
exports.prisma = new client_1.PrismaClient();
app.listen(5000, () => {
    console.log("started server at port 5000");
});
