import { JsonResponse } from "../utils/apiResponse";
import { MSG_TYPES } from "../constants/msgTypes";
import jwt from "jsonwebtoken";
import { getConfig } from "../config/index";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";

const config = getConfig();

export const Auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return JsonResponse(res, 401, MSG_TYPES.ACCESS_DENIED);
  try {
    const decoded = jwt.verify(token, config.jwt.key);
    if (!decoded) JsonResponse(res, 406, MSG_TYPES.ACCESS_DENIED);
    req.body.user = await getRepository(User).findOne({
      where: { email: decoded.email },
    });
    delete req.body.user.password;
    next();
  } catch (ex) {
    if (ex.name === "TokenExpiredError") {
      return JsonResponse(res, 403, MSG_TYPES.SESSION_EXPIRED);
    }
    JsonResponse(res, 406, "USER NOT FOUND or TOKEN INCOMPLETE :" + ex);
  }
};

export const IsAdmin = async (req, res, next) => {
  if (!req.body.user) return JsonResponse(res, 406, "NOT AUTHORIZED");
  if (req.body.user.role !== "admin")
    return JsonResponse(res, 406, "UNAUTHORIZED, Must be an Admin");
  next();
};
