import Link from "next/link";
import { ChangeEvent, use, useEffect, useState } from "react";
import { LoginData } from "../../models/loginData";
import authService from "../../services/auth.service";
import { useRouter } from "next/router";
import {
  Card,
  Modal,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  FormElement,
} from "@nextui-org/react";

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [state, setState] = useState<LoginData>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<FormElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      await authService.login(state);
      router.push("/offer/allOffer");
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setErr(message);
    }
  };

  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ minHeight: "80vh" }}
      >
        <Card css={{ mw: "420px", p: "20px" }} variant="bordered">
          <Text
            size={24}
            weight="bold"
            css={{
              as: "center",
              mb: "20px",
            }}
          >
            Login
          </Text>
          <Input
            clearable
            underlined
            fullWidth
            aria-label="email"
            color="primary"
            size="lg"
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
          <Spacer y={1} />
          <Input
            clearable
            underlined
            fullWidth
            aria-label="password"
            color="primary"
            size="lg"
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            css={{ mb: "6px" }}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Link href="/auth/register">No account yet? Sign up!</Link>
          </Row>
          <Spacer y={1} />
          <Button onClick={login}>Sign in</Button>
        </Card>
      </Container>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={err != ""}
        onClose={() => setErr("")}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Ups... 🤷‍♂️
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-title" style={{ textAlign: "center" }} size={18}>
            {err}
          </Text>
        </Modal.Body>
      </Modal>
    </>
  );
}
