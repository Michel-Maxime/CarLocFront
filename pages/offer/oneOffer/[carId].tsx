import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPageContext,
} from "next";
import PaymentGateway from "../../../components/paymentGateway";
import { Car } from "../../../models/car";
import carsService from "../../../services/cars.service";

export default function OneOffer({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { id, ownerId, image, name, description, price, isAvaible }: Car = data;
  return (
    <>
      <div style={{ border: "2px solid black" }}>
        <p>OWNERID : {ownerId}</p>
        <p>{image}</p>
        <p>{name}</p>
        <p>{description}</p>
        <p>{price}</p>
        {isAvaible ? <p>is Avaible</p> : <p>is not Avaible</p>}
        <button>LOUER CETTE VOITURE</button>
        <PaymentGateway carId={id} ownerId={ownerId} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Car;
}> = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const { carId } = ctx.query;

  //const data = await carsService.getCars(cookie);
  const data = await carsService.GetCarByID(carId as string, cookie);

  return { props: { data } };
};
