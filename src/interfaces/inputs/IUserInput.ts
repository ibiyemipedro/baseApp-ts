export interface IUserInput {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: number;
  mobileNumber: number;
  address: string;
  password: string;
  profileImageUrl: string;
  interests: [string];
  gender: string;
  role: string;
  status: string;
  isVerified: boolean;
  dateOfBirth: Date;
}
