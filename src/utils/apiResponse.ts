import { MSG_TYPES } from "../constants/msgTypes";
import { Response } from "express";

export const JsonResponse = (
  res: Response,
  status: number,
  msg: string,
  data: any = null,
  meta: any = null
) => {
  const body = {
    msg: "",
    data: null,
    meta: null,
  };

  if (data) {
    body.data = data;
  }
  if (meta) {
    body.meta = meta;
  }

  if (typeof msg === "string") {
    const data = MSG_TYPES[msg];
    if (typeof data !== "undefined") {
      body.msg = MSG_TYPES[msg];
    } else {
      body.msg = msg;
    }
  }
  res.status(status ?? 200).send(body);
};
