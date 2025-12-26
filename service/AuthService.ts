import { AxiosResponse } from "axios";
import { mainApi } from "./shared/base";
import { User } from "./types";

export class AuthService {
  static logInFunction = async ({ username }: Pick<User, "username">) => {
    const response: AxiosResponse<User[], any> = await mainApi("user", {
      params: {
        username,
      },
    });
    return response;
  };
  static registerFunction = async (data: User) => {
    const response: AxiosResponse<User, any> = await mainApi.post("user", data);

    return response;
  };
}
