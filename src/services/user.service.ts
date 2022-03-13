import { mapUser } from "./helpers/userMapper";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { IUser } from "../interfaces/dto/IUser";
import HttpException from "../utils/httpException";

class UserService {
  constructor() {
    // this.config = getConfig();
  }

  async getProfile(userId: number): Promise<IUser | Error> {
    try {
      const user = await getRepository(User).findOne({
        where: { id: userId },
        relations: ["company"],
      });

      if (!user) {
        return new HttpException(400, "User not found", "get user service");
      }
      return mapUser(user);
    } catch (error) {
      error.source = "Create Company Service";
      throw error;
    }
  }
}

export default UserService;
