import { Action, ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

import { app } from "../index";
var http = require("http");

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  constructor() {}

  async use(req: any, res: any, next: (err?: any) => any): Promise<any> {
    try {
      //console.log(req.headers);
      fetch("http://localhost:5000/auth/is-logged-in", {
        method: "GET",
        headers: {
          authorization: req.headers.authorization,
          deviceid: req.headers.deviceid,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            next();
          } else {
            res.status(401).send(data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }
}
