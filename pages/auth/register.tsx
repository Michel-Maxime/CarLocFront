import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { RegisterData } from "../../models/registerData";
import authService from "../../services/auth.service";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  Modal,
  FormElement,
} from "@nextui-org/react";
export default function Register() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [state, setState] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<FormElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await authService.register(state);
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
            Sign up
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
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
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
            <Link href="/auth/login">Already an account? Sign in!</Link>
          </Row>
          <Spacer y={1} />
          <Button onPress={register}>Sign in</Button>
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
