import { LoginData } from "../models/loginData";
import { RegisterData } from "../models/registerData";

// TODO : voir pour faire de l'injection de dependence propre
class AuthService {
  constructor() {}

  async login(state: LoginData) {
    const res = await fetch(`http://localhost:5000/auth/signin`, {
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
    const res = await fetch(`http://localhost:5000/auth/signup`, {
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
