import { validateCompany } from "./../validations/company.validation";
import { MSG_TYPES } from "../constants/msgTypes";
import { JsonResponse } from "../utils/apiResponse";
import { Request, Response, NextFunction } from "express";
import { CompanyService } from "../services";
import HttpException from "../utils/httpException";

const companyInstance = new CompanyService();

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateCompany(req.body);
    if (error) return JsonResponse(res, 400, error.details[0].message);

    const ownerId = req.body.ownerId;
    delete req?.body?.ownerId;

    const response = await companyInstance.create(req.body, null, ownerId);
    if (response instanceof HttpException)
      return JsonResponse(res, response.code, response.message, null, {
        source: response.source,
      });

    return JsonResponse(res, 200, MSG_TYPES.CREATED, response);
  } catch (error) {
    next(error);
  }
};

export const getCompanyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let companyId;

    if (req?.query?.companyId) {
      companyId = +req?.query?.companyId;
    } else {
      return JsonResponse(res, 400, "companyId required");
    }

    const response = await companyInstance.get(companyId);
    if (response instanceof HttpException)
      return JsonResponse(res, response.code, response.message, null, {
        source: response.source,
      });

    return JsonResponse(res, 200, MSG_TYPES.FETCHED, response);
  } catch (error) {
    next(error);
  }
};
