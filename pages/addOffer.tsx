import { ChangeEvent, useState } from "react";
import { Car } from "../models/car";
import carsService from "../services/cars.service";

export default function AddOffer() {
  const [state, setState] = useState<Car>({
    ownerId: "016b02bb-61b2-4a31-bac1-ad88b3deea31", //TODO: get L'id du current User
    image: "",
    name: "",
    description: "",
    price: 0,
    isAvaible: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={() => {}}>
        <h1>ADD OFFER</h1>
        <input
          type="text"
          name="image"
          placeholder="Image"
          value={state.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={state.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={state.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={state.price}
          onChange={handleChange}
        />
        <button type="submit">Add Offer</button>
      </form>
      <button
        onClick={() => {
          carsService.addCar(state);
        }}
      >
        ADD OFFER WITHOUT FORM REFRESH
      </button>
    </>
  );
}
