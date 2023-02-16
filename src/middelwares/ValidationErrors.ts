import { ValidationError } from "class-validator";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
export class ValidationErrors implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, res: any, next: (err: any) => any) {
    if (error) {
      const responseObject = {} as any;

      responseObject.message =
        "You have an error in your request's body. Check 'errors' field for more details!";
      responseObject.errors = error;
      //responseObject.status = 0;
      //responseObject.data = {};
      //responseObject.data.message = [];
      // error.errors.forEach((element: ValidationError) => {
      //     Object.keys(element.constraints).forEach((type) => {
      //         responseObject.data.message.push(`property ${element.constraints[type]}`);
      //     });
      // });

      res.json(responseObject);
    }
  }
}
