import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { RegisterData } from "../models/registerData";
import authService from "../services/auth.service";

export default function Register() {
  const router = useRouter();

  const [state, setState] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const register = async () => {
    // TODO : check si ca c'est bien passé
    await authService.register(state).then(() => {
      router.push("/addOffer");
    });
  };

  return (
    <>
      <form
        onSubmit={() => {
          authService.register(state);
        }}
      >
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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleChange}
        />
        <Link href={`/login`}>Already an account? Sign in!</Link>
        <button type="submit">Register</button>
      </form>
      <button onClick={register}>REGISTER WITHOUT FORM REFRESH</button>
    </>
  );
}
