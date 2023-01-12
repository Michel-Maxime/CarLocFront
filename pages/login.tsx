import Link from "next/link";
import { ChangeEvent, use, useEffect, useState } from "react";
import { LoginData } from "../models/loginData";
import authService from "../services/auth.service";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [state, setState] = useState<LoginData>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const login = async () => {
    // TODO : check si ca c'est bien passé
    await authService.login(state).then(() => {
      router.push("/addOffer");
    });
  };

  return (
    <>
      <form onSubmit={() => authService.login(state)}>
        <h1>LOGIN</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <Link href={`/register`}>No account yet? Sign up!</Link>
        <button type="submit">login</button>
      </form>
      <button onClick={login}>LOGIN WITHOUT FORM REFRESH</button>
    </>
  );
}
