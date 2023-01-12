import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { LoginData } from "../models/loginData";

export default function Login() {
  const [state, setState] = useState<LoginData>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={() => {}}>
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
  );
}
