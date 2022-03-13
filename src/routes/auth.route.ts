import express from "express";
import { userLogin, userRegister } from "./../controllers/auth.controller";

export const router = express.Router();

router.post("/", userLogin);
router.post("/sign-up", userRegister);
