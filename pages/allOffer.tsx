import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Car } from "../models/car";
import carsService from "../services/cars.service";

export default function AllOffer({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const cars: Car[] = data;
  return (
    <>
      {cars?.map(
        ({ ownerId, image, name, description, price, isAvaible }, index) => (
          <div key={index} style={{ border: "2px solid black" }}>
            <p>{image}</p>
            <p>{name}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{isAvaible}</p>
          </div>
        )
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Car[];
}> = async () => {
  const data = await carsService.getCars();
  return { props: { data } };
};
