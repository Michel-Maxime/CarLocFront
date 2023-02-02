import { Card, Col, Grid, Text, Button, Row } from "@nextui-org/react";
import { ReactElement } from "react";
import { Car } from "../../models/car";
import CarCard from "./card";

export default function CardGrid(props: { cars: Car[] } & { Buttons: any }) {
  const { cars, Buttons } = props;
  return (
    <Grid.Container gap={2} justify="center">
      {cars?.map(
        ({ id, ownerId, image, name, description, price, isAvaible }: Car) => (
          <Grid key={id} xs={6} md={6}>
            <CarCard
              image={image}
              name={name}
              description={description}
              price={price}
              id={id}
              ownerId={ownerId}
              isAvaible={isAvaible}
              Buttons={Buttons}
            />
          </Grid>
        )
      )}
    </Grid.Container>
  );
}
