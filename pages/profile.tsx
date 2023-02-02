import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { useRouter } from "next/router";
import * as UserModel from "../models/user";

import authService from "../services/auth.service";
import userService from "../services/user.service";
import carsService from "../services/cars.service";
import CardGrid from "../components/offer/card.grid";
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
  User,
} from "@nextui-org/react";
import DeleteButon from "../components/buton/delete.buton";
import UpdateButon from "../components/buton/update.buton";

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const logout = async () => {
    await authService.logout();
    router.push("/auth/login");
  };

  const ProfileButtons = (id: string) => {
    return (
      <>
        <UpdateButon id={id} />
        <Spacer />
        <DeleteButon id={id} />
      </>
    );
  };

  return (
    <div>
      {user != null ? (
        <div>
          <Spacer y={3} />
          <div style={{ textAlign: "center" }}>
            <User
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name={user.name}
              description={user.email}
              size="xxl"
              zoomed
            />
          </div>

          <Spacer y={3} />
          {user.cars?.length ? (
            <div>
              <div style={{ textAlign: "center" }}>
                <h3>MY CARS </h3>
              </div>
              <CardGrid cars={user.cars} Buttons={ProfileButtons} />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ marginTop: 200 }}>You have no car yet</h3>
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: 350 }}>
          <h2>Please Login</h2>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  user: UserModel.User | null;
}> = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;

  if (cookie == undefined) return { props: { user: null } };

  const user: UserModel.User = await userService.getCurrentUser(cookie);

  return { props: { user } };
};
