import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { useRouter } from "next/router";

import { useEffect } from "react";
import DeleteButon from "../../components/buton/delete.buton";
import RentButon from "../../components/buton/rent.buton";
import CardGrid from "../../components/offer/card.grid";
import { Car } from "../../models/car";
import carsService from "../../services/cars.service";

export default function AllOffer({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const cars: Car[] = data;

  return (
    <>
      {cars?.length ? (
        <CardGrid cars={cars} Buttons={RentButon} />
      ) : (
        "Ups no offer"
      )}
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
