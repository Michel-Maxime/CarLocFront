import { Car } from "../models/car";

class CarsService {
  constructor() {}

  async getCars(): Promise<Car[]> {
    const res = await fetch(`http://localhost:5000/cars`);
    const car: Car[] = await res.json();
    return car;
  }
}

const carsService = new CarsService();

export default carsService;
