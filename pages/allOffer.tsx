import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { useEffect } from "react";
import { Car } from "../models/car";
import carsService from "../services/cars.service";

export default function AllOffer({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const cars: Car[] = data;

  return (
    <>
      {cars.length > 2
        ? cars?.map(
            (
              { ownerId, image, name, description, price, isAvaible },
              index
            ) => (
              <div key={index} style={{ border: "2px solid black" }}>
                <p>OWNERID : {ownerId}</p>
                <p>{image}</p>
                <p>{name}</p>
                <p>{description}</p>
                <p>{price}</p>
                <p>{isAvaible}</p>
                <button>LOUER CETTE VOITURE</button>
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
