import { LoginData } from "../models/loginData";
import { RegisterData } from "../models/registerData";
import { SERVER_URL, LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "./constants";

// TODO : voir pour faire de l'injection de dependence propre
class AuthService {
  constructor() {}

  async login(state: LoginData) {
    const res = await fetch(`${SERVER_URL}${LOGIN_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("login ok");
    } else {
      alert("login Bad credentials");
    }
  }

  async register(state: RegisterData) {
    const res = await fetch(`${SERVER_URL}${REGISTER_ENDPOINT}`, {
      method: "POST",
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
}

var authService = new AuthService();
export default authService;
