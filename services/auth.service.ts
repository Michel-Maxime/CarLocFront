import { LoginData } from "../models/loginData";
import { RegisterData } from "../models/registerData";
import {
  SERVER_URL,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  LOGOUT_ENDPOINT,
} from "./constants";

class AuthService {
  async login(state: LoginData): Promise<void> {
    const res = await fetch(`${SERVER_URL}${LOGIN_ENDPOINT}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
  }

  async register(state: RegisterData): Promise<void> {
    const res = await fetch(`${SERVER_URL}${REGISTER_ENDPOINT}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      throw new Error(data.message);
    }
  }

  async logout(): Promise<void> {
    await fetch(`${SERVER_URL}${LOGOUT_ENDPOINT}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

var authService = new AuthService();
export default authService;
