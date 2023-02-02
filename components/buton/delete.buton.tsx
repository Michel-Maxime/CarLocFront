import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import carsService from "../../services/cars.service";

export default function DeleteButon(props: { id: string }) {
  const router = useRouter();
  const { id } = props;

  const dropCar = async (id: string) => {
    await carsService.DeleteCar(id);
    router.reload();
  };

  return (
    <Button onPress={() => dropCar(id)} size="sm" color="error" shadow>
      Delete
    </Button>
  );
}
