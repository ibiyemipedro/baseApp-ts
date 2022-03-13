import { mapUser } from "./helpers/userMapper";
import { UserRole, UserStatus } from "./../constants/appConstants";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConfig } from "../config/index";
import { IUser } from "../interfaces/dto/IUser";
import HttpException from "../utils/httpException";

class AuthService {
  private config: any;

  constructor() {
    this.config = getConfig();
  }

  async signUp(body): Promise<IUser | Error> {
    try {
      const existingUser = await getRepository(User).findOne({
        where: [{ email: body.email }, { mobileNumber: body.mobileNumber }],
      });

      if (existingUser) {
        return new HttpException(
          400,
          "Email or mobile number already used",
          "sign up service"
        );
      }

      const hashedPassword = await bcrypt.hash(
        body.password,
        this.config.application.salt
      );
      body.password = hashedPassword;
      body.status = UserStatus.ACTIVE;
      body.role = UserRole.USER;
      body.isVerified = true;

      const createdUser = await getRepository(User).save(body);

      return mapUser(createdUser);
    } catch (error) {
      error.source = "Sign Up Service";
      throw error;
    }
  }

  async signIn(body): Promise<{ user: IUser; token: string } | Error> {
    try {
      const user: User | undefined = await getRepository(User).findOne({
        where: { email: body.email },
      });
      if (!user) {
        return new HttpException(
          400,
          `The email address ${body.email} is not associated with any account. please check and try again!`,
          "sign in service"
        );
      }

      const isEqual = await bcrypt.compare(body.password, user.password);
      if (!isEqual) {
        return new HttpException(400, "Password incorrect", "sign in service");
      }
      const token: string = await jwt.sign(mapUser(user), this.config.jwt.key, {
        expiresIn: "3d",
      });
      if (!token) {
        return new HttpException(400, "Could not sign user", "sign in service");
      }
      return { user: mapUser(user), token };
    } catch (error) {
      error.source = "Sign In Service";
      throw new Error(error);
    }
  }
}

export default AuthService;
