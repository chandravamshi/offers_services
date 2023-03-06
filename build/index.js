"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
// this shim is required
const routing_controllers_1 = require("routing-controllers");
const client_1 = require("@prisma/client");
require("reflect-metadata");
const typedi_1 = require("typedi");
const OfferController_1 = require("./controllers/OfferController");
const luxon_1 = require("luxon");
(0, routing_controllers_1.useContainer)(typedi_1.Container);
let compression = require("compression");
var morgan = require("morgan");
luxon_1.Settings.defaultZone = "utc";
//const crypto = require('crypto');
// creates express app, registers all controller routes and returns you express app instance
exports.app = (0, routing_controllers_1.createExpressServer)({
    cors: {
        maxAge: 7200,
    },
    defaultErrorHandler: false,
});
(0, routing_controllers_1.useExpressServer)(exports.app, {
    controllers: [OfferController_1.OfferController],
});
exports.app.use(morgan(process.env.LOG_FORMAT || "common"));
exports.app.use(compression());
exports.prisma = new client_1.PrismaClient();
exports.app.listen(process.env.PORT, () => {
    console.log("started server at port process.env.PORT");
});
