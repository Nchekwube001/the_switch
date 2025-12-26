import { AxiosResponse } from "axios";
import { mainApi } from "./shared/base";
import { Card, User } from "./types";

export class UserService {
  static getUserById = async (id: string) => {
    const data: AxiosResponse<User, any> = await mainApi(`user/${id}`, {});
    return data?.data ?? {};
  };
  static getCards = async () => {
    const data: AxiosResponse<Card[], any> = await mainApi(`cards`, {});
    return data?.data ?? [];
  };
}
