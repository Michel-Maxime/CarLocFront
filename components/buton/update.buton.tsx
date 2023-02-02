import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function UpdateButon(props: { id: string }) {
  const router = useRouter();
  const { id } = props;
  return (
    <Button
      onPress={() =>
        router.push({
          pathname: "/offer/updateOffer/[carId]",
          query: { carId: id },
        })
      }
      size="sm"
      color="warning"
      shadow
    >
      Update
    </Button>
  );
}
