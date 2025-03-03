import UserModel from "../models/user.model";
import RiderModel from "../models/rider.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
      rider?: RiderModel;
    }
  }
}
