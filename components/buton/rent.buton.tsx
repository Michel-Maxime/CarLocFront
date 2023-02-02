import { Button, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function RentButon(props: { id: string }) {
  const router = useRouter();
  const { id } = props;
  return (
    <Button
      flat
      auto
      rounded
      color="primary"
      onClick={() => {
        router.push({
          pathname: "/offer/oneOffer/[carId]",
          query: { carId: id },
        });
      }}
    >
      <Text
        css={{ color: "inherit" }}
        size={12}
        weight="bold"
        transform="uppercase"
      >
        Rent
      </Text>
    </Button>
  );
}
