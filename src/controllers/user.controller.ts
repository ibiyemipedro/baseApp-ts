import { MSG_TYPES } from "./../constants/msgTypes";
import { JsonResponse } from "./../utils/apiResponse";
import HttpException from "../utils/httpException";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services";

const userInstance = new UserService();

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.user.id;
    delete req.body.user;

    const response = await userInstance.getProfile(userId);
    if (response instanceof HttpException)
      return JsonResponse(res, response.code, response.message, null, {
        source: response.source,
      });

    return JsonResponse(res, 200, MSG_TYPES.FETCHED, response);
  } catch (error) {
    next(error);
  }
};
