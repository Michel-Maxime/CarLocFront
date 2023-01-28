import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { Car } from "../../models/car";
import carsService from "../../services/cars.service";

export default function AllOffer({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const cars: Car[] = data;

  return (
    <>
      {cars.length > 2
        ? cars?.map(
            ({ id, ownerId, image, name, description, price, isAvaible }) => (
              <div key={id} style={{ border: "2px solid black" }}>
                <div
                  onClick={() => {
                    router.push({
                      pathname: "/offer/oneOffer/[carId]",
                      query: { carId: id },
                    });
                  }}
                >
                  <p>OWNERID : {ownerId}</p>
                  <p>{image}</p>
                  <p>{name}</p>
                  <p>{description}</p>
                  <p>{price}</p>
                  <p>{isAvaible}</p>
                </div>

                <button
                  onClick={() => {
                    router.push({
                      pathname: "/payment/[carId]",
                      query: { carId: id },
                    });
                  }}
                >
                  LOUER CETTE VOITURE
                </button>
              </div>
            )
          )
        : "Ups not login"}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Car[];
}> = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;

  const data = await carsService.getCars(cookie);
  return { props: { data } };
};
