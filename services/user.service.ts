import { User } from "../models/user";
import { SERVER_URL, USERS_ENDPOINT } from "./constants";

class UserService {
  constructor() {}

  async getUserById(cookie: string | undefined, userId: string): Promise<User> {
    const res = await fetch(`${SERVER_URL}${USERS_ENDPOINT}/${userId}`, {
      headers: {
        cookie: cookie!,
      },
    });
    const user: User = await res.json();
    return user;
  }

  async getCurrentUser(cookie: string | undefined) {
    const res = await fetch(`${SERVER_URL}${USERS_ENDPOINT}/me`, {
      headers: {
        cookie: cookie!,
      },
    });
    const user: User = await res.json();
    return user;
  }
}

const userService = new UserService();

export default userService;
