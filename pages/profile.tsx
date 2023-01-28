import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { useRouter } from "next/router";
import { User } from "../models/user";

import authService from "../services/auth.service";
import userService from "../services/user.service";
import carsService from "../services/cars.service";

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { email, createdAt, updatedAt, cars }: User = user;

  const logout = async () => {
    await authService.logout();
    router.push("/auth/login");
  };

  const dropCar = async (id: string) => {
    await carsService.DeleteCar(id);
    router.reload();
  };

  return (
    <>
      <button onClick={logout}>Logout</button>

      <h1>User Infos</h1>

      <div>
        <p>{email}</p>
        <p>{createdAt}</p>
        <p>{updatedAt}</p>
        {cars?.map(
          ({ id, ownerId, image, name, description, price, isAvaible }) => (
            <div key={id} style={{ border: "2px solid black" }}>
              <p>OWNERID : {ownerId}</p>
              <p>{image}</p>
              <p>{name}</p>
              <p>{description}</p>
              <p>{price}</p>
              <p>{isAvaible}</p>
              <button onClick={() => dropCar(id)}>Supprimer</button>
              <button
                onClick={() =>
                  router.push({
                    pathname: "/offer/updateOffer/[carId]",
                    query: { carId: id },
                  })
                }
              >
                Modifier
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  user: User;
}> = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;

  const user: User = await userService.getCurrentUser(cookie);

  return { props: { user } };
};
