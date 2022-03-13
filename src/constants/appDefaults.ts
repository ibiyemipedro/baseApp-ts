import { LoginStatus } from "./appConstants";
import { ISubscription } from "../interfaces/dto/ISubscription";

export const defaultSubscriptionValue: ISubscription = {
  name: "Trial",
  description: "Free trial for new all user",
  services: [""],
  cost: 0,
  duration: 30,
};

export const defaultSystemSettings = [
  {
    settingName: "allowLogin",
    settingValue: LoginStatus.ALL,
  },
];
