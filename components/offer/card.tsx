import {
  Grid,
  Card,
  Text,
  Image,
  Button,
  Spacer,
  Col,
  Row,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Car } from "../../models/car";
import carsService from "../../services/cars.service";

export default function CarCard(props: Car & { Buttons: any }) {
  const { id, name, image, description, price, isAvaible, Buttons } = props;
  const router = useRouter();

  const dropCar = async (id: string) => {
    await carsService.DeleteCar(id);
    router.reload();
  };

  return (
    <Card css={{ w: "100%", h: "400px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          {isAvaible ? <Text>🟢</Text> : <Text>🔴</Text>}
          <Text h3 color="white" css={{ textShadow: "3px 3px 3px #0372f1" }}>
            {name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={image}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Car picture"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            {isAvaible ? (
              <Text color="#000" size={12}>
                is avaible
              </Text>
            ) : (
              <Text color="#000" size={12}>
                is not avaible yet
              </Text>
            )}
            <Text h6 size={14} color="#000">
              price : {price} €
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end" css={{ marginTop: 8 }}>
              <Buttons id={id} />
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
  // <Card css={{ h: "$200", $$cardColor: "#e6e6e6" }}>
  //   <Card.Body
  //     onClick={() => {
  //       router.push({
  //         pathname: "/offer/oneOffer/[carId]",
  //         query: { carId: id },
  //       });
  //     }}
  //   >
  //     <Card.Header>
  //       <Text h1 size={15} color="black" css={{ m: 0 }}>
  //         {name}
  //       </Text>
  //       <Spacer css={{ marginLeft: "$3" }} />
  //       {isAvaible ? <Text>🟢</Text> : <Text>🔴</Text>}
  //     </Card.Header>
  //     <Card.Image
  //       src={image}
  //       objectFit="cover"
  //       width="100%"
  //       height={340}
  //       alt="Card image background"
  //     />
  //     <Text
  //       size={15}
  //       color="black"
  //       css={{
  //         whiteSpace: "nowrap",
  //         overflow: "hidden",
  //         textOverflow: "ellipsis",
  //       }}
  //     >
  //       {description}
  //     </Text>
  //     <Text h6 size={15} color="black" css={{ m: 0 }}>
  //       price : {price} €
  //     </Text>
  //     {isProfile ? (
  //       <Card.Footer>
  //         <Button
  //           onPress={() =>
  //             router.push({
  //               pathname: "/offer/updateOffer/[carId]",
  //               query: { carId: id },
  //             })
  //           }
  //           size="sm"
  //           color="warning"
  //           shadow
  //         >
  //           Update
  //         </Button>
  //         <Spacer />
  //         <Button onPress={() => dropCar(id)} size="sm" color="error" shadow>
  //           Delete
  //         </Button>
  //       </Card.Footer>
  //     ) : (
  //       <Card.Footer>
  //         <Button
  //           onClick={() => {
  //             router.push({
  //               pathname: "/offer/oneOffer/[carId]",
  //               query: { carId: id },
  //             });
  //           }}
  //           size="sm"
  //           color="success"
  //           shadow
  //         >
  //           Rent
  //         </Button>
  //       </Card.Footer>
  //     )}
  //   </Card.Body>
  // </Card>
}
