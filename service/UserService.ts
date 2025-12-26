import { mainApi } from "./shared/base";

export class UserService {
  static getUserById = async (id: string) => {
    const data = await mainApi(`user/${id}`, {});
    return data;
  };
}
