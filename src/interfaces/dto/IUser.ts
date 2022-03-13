import { ICompany } from "./ICompany";

export interface IUser {
  id?: number;
  uuid?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  password?: string;
  countryCode?: string;
  mobileNumber?: string;
  profileImageUrl?: string;
  interests?: [string];
  gender?: string;
  role?: string;
  state?: string;
  country?: string;
  permissionLevel?: number;
  status?: string;
  dateOfBirth?: Date;
  company?: ICompany;
}
