import { User } from "./../../entities/user.entity";
import { IUser } from "./../../interfaces/dto/IUser";

export const mapUser = (user: User): IUser => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    uuid: user.uuid,
    countryCode: user.countryCode,
    mobileNumber: user.mobileNumber,
    email: user.email,
    address: user.address,
    profileImageUrl: user.profileImageUrl,
    dateOfBirth: user.dateOfBirth,
    status: user.status,
    state: user.state,
    country: user.country,
    interests: user.interests,
    gender: user.gender,
    role: user.role,
    permissionLevel: user.permissionLevel,
    company: user.company,
  };
};
