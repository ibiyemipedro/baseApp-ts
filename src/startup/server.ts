import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import HttpException from "../utils/httpException";

import { router as authRoutes } from "../routes/auth.route";
import { router as userRoutes } from "../routes/user.route";
import { router as companyRoutes } from "../routes/company.route";

import { loggerMiddleware } from "../utils/common";

export function getApp() {
  const { SERVER_PARSER_EXTENDED, SERVER_PARSER_LIMIT } = process.env;

  const app: express.Application = express();

  const currentVersion = "/api/v1";

  app.use(
    bodyParser.urlencoded({
      extended: SERVER_PARSER_EXTENDED === "true",
      limit: SERVER_PARSER_LIMIT || "2mb",
    })
  );
  app.use(cors());
  app.use(
    bodyParser.json({
      limit: SERVER_PARSER_LIMIT || "2mb",
    })
  );

  app.use(loggerMiddleware);

  app.use(`${currentVersion}/auth`, authRoutes);
  app.use(`${currentVersion}/user`, userRoutes);
  app.use(`${currentVersion}/company`, companyRoutes);

  app.use("/", (req, res) =>
    res
      .status(200)
      .json({ message: "Welcome to Sample Typescript-Express Api." })
  );

  // Global error handler
  app.use((error: HttpException, req: Request, res: Response) => {
    const status = error.code || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
      error: true,
      status: status,
      message,
      data,
    });
  });

  return app;
}
