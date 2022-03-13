import express from "express";
import {
  createCompany,
  getCompanyProfile,
} from "../controllers/company.controller";
import { Auth } from "./../middlewares/auth";

export const router = express.Router();

router.post("/", createCompany);
router.get("/", [Auth], getCompanyProfile);
