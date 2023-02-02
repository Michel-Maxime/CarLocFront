import {
  Button,
  FormElement,
  Input,
  Spacer,
  Textarea,
} from "@nextui-org/react";
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

  const handleChange = (e: ChangeEvent<FormElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const updateOffer = async () => {
    await carsService.UpdateCarInfos(carId, state);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <Spacer y={2} />
      <Input
        width="50%"
        type="text"
        clearable
        name="image"
        underlined
        labelPlaceholder="Picture"
        initialValue="Picture"
        value={state.image}
        onChange={handleChange}
      />
      <Spacer y={3} />
      <Input
        width="50%"
        type="text"
        clearable
        underlined
        name="name"
        labelPlaceholder="Name"
        initialValue="Name"
        value={state.name}
        onChange={handleChange}
      />
      <Spacer y={3} />
      <Textarea
        width="50%"
        name="description"
        labelPlaceholder="Description"
        initialValue="Description"
        value={state.description}
        onChange={handleChange}
      />
      <Spacer y={3} />
      <Input
        width="50%"
        type="number"
        clearable
        underlined
        name="price"
        labelPlaceholder="Price"
        initialValue="Price"
        value={state.price}
        onChange={handleChange}
      />
      <Spacer y={3} />
      <Button size="sm" color="warning" shadow onPress={updateOffer}>
        Upload Changes
      </Button>
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
