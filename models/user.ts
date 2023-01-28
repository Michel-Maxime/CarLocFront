import { Car } from "./car";

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  cars: Car[];
}
