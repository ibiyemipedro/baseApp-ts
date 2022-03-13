import { validateUser, validateLogin } from "./../validations/user.validation";
import { MSG_TYPES } from "./../constants/msgTypes";
import { JsonResponse } from "./../utils/apiResponse";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";
import HttpException from "../utils/httpException";

const authInstance = new AuthService();

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return JsonResponse(res, 400, error.details[0].message);

    const response = await authInstance.signIn(req.body);

    if (response instanceof HttpException)
      return JsonResponse(res, response.code, response.message, null, {
        source: response.source,
      });
    return JsonResponse(res, 200, MSG_TYPES.FETCHED, response);
  } catch (error) {
    next(error);
  }
};

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return JsonResponse(res, 400, error.details[0].message);

    const response = await authInstance.signUp(req.body);

    if (response instanceof HttpException)
      return JsonResponse(res, response.code, response.message, null, {
        source: response.source,
      });

    return JsonResponse(res, 200, MSG_TYPES.CREATED, response);
  } catch (error) {
    next(error);
  }
};
