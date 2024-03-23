import { Router } from "express";
import {
  addCar,
  carsList,
  deleteCar,
  updateCar,
  viewCar,
} from "./controllers/cars";

const routes = Router();

routes.get("/cars", carsList);
routes.get("/cars/:id", viewCar);
routes.post("/cars", addCar);
routes.put("/cars/:id", updateCar);
routes.delete("/cars/:id", deleteCar);

export default routes;
