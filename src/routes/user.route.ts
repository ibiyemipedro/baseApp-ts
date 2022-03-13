import { Auth } from "./../middlewares/auth";
import express from "express";
import { getProfile } from "./../controllers/user.controller";

export const router = express.Router();

router.get("/", [Auth], getProfile);
