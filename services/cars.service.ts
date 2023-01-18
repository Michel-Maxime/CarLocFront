import { Car } from "../models/car";
import { SERVER_URL, CARS_ENDPOINT } from "./constants";

class CarsService {
  constructor() {}

  async getCars(cookie: string | undefined): Promise<Car[]> {
    const res = await fetch(`${SERVER_URL}${CARS_ENDPOINT}`, {
      headers: {
        cookie: cookie!,
      },
    });
    const car: Car[] = await res.json();
    return car;
  }

  async addCar(car: Car): Promise<void> {
    var res = await fetch(`${SERVER_URL}${CARS_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify({
        ownerId: car.ownerId,
        image: car.image,
        name: car.name,
        description: car.description,
        price: car.price,
      } as Car),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("add Car succefully");
    } else {
      alert("Issues when want to add cars");
    }
  }

  //l'objet car doit avoir un id pck sinon on pourra jamais get byId ou delete
  // ou alors faire un Objetc Car et un CarDto
  async GetCarByID(carId: string): Promise<Car> {
    var res = await fetch(`${SERVER_URL}${CARS_ENDPOINT}/${carId}`);
    const car: Car = await res.json();
    return car;
  }

  async UpdateCarInfos(carId: string, car: Car): Promise<void> {
    var res = await fetch(`${SERVER_URL}${CARS_ENDPOINT}/${carId}`, {
      method: "PATCH",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Update Car succefully");
    } else {
      alert("Issues when want to Update cars");
    }
  }

  async DeleteCar(carId: string) {
    var res = await fetch(`${SERVER_URL}${CARS_ENDPOINT}/${carId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Delete Car succefully");
    } else {
      alert("Issues when want to Delete cars");
    }
  }
}

const carsService = new CarsService();

export default carsService;
