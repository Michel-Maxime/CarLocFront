import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { RegisterData } from "../models/registerData";

export default function Register() {
  const [state, setState] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={() => {}}>
      <h1>REGISTER</h1>
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
      <input type="text" name="name" placeholder="Name" />
      <Link href={`/login`}>Already an account? Sign in!</Link>
      <button type="submit">Register</button>
    </form>
  );
}
