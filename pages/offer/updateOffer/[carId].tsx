import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import { ChangeEvent, useState } from "react";
import { Car } from "../../../models/car";
import carsService from "../../../services/cars.service";

export default function UpdateOffer({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { id: carId } = data;
  const [state, setState] = useState<Car>(data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const updateOffer = async () => {
    await carsService.UpdateCarInfos(carId, state);
  };

  return (
    <div>
      <input
        type="text"
        name="image"
        placeholder="image"
        value={state.image}
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={state.name}
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="description"
        placeholder="description"
        value={state.description}
        onChange={handleChange}
      ></input>
      <input
        type="number"
        name="price"
        placeholder="price"
        value={state.price}
        onChange={handleChange}
      ></input>
      <button onClick={updateOffer}>post changes</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Car;
}> = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const { carId } = ctx.query;

  const data = await carsService.GetCarByID(carId as string, cookie);

  return { props: { data } };
};
