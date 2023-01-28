import { ChangeEvent, useState } from "react";
import carsService from "../../services/cars.service";

export default function DeleteOffer() {
  const [carId, setCarID] = useState<string>("");

  return (
    <>
      <form
        onSubmit={() => {
          carsService.DeleteCar(carId);
        }}
      >
        <h1>DELETE OFFER</h1>
        <input
          type="text"
          name="carId"
          placeholder="Car id"
          value={carId}
          onChange={(event) => setCarID(event.target.value)}
        />
        <button type="submit">Delete Offer</button>
      </form>
      <button
        onClick={() => {
          carsService.DeleteCar(carId);
        }}
      >
        DELETE OFFER WITHOUT FORM REFRESH
      </button>
    </>
  );
}
