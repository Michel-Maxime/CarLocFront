import { LoginData } from "../models/loginData";
import { RegisterData } from "../models/registerData";
import {
  SERVER_URL,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  LOGOUT_ENDPOINT,
} from "./constants";

class AuthService {
  token: string = "";

  async login(state: LoginData): Promise<void> {
    await fetch(`${SERVER_URL}${LOGIN_ENDPOINT}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((resJson) => {
        console.log(resJson);
      });
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
    if (res.ok) {
      alert("register ok");
    } else {
      alert("register Bad credentials");
    }
  }

  async logout(): Promise<void> {
    const res = await fetch(`${SERVER_URL}${LOGOUT_ENDPOINT}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("logout ok");
    } else {
      alert("logout error");
    }
  }
}

var authService = new AuthService();
export default authService;
