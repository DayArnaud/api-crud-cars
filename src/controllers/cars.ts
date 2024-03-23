import { Request, Response } from "express";
import { knex } from "../database/dbConnection";
import { Car } from "../types";

export const carsList = async (_: Request, res: Response) => {
  try {
    const cars = await knex<Car>("cars");
    return res.json(cars);
  } catch {
    return res.status(500).json({ message: "Intern error from server" });
  }
};

export const viewCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await knex<Car>("cars")
      .where({ id: Number(id) })
      .first();

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.json(car);
  } catch {
    return res.status(500).json({ message: "Intern error from server" });
  }
};

export const addCar = async (req: Request, res: Response) => {
  const { brand, model, color, release_year, price } = req.body;

  try {
    const car = await knex<Omit<Car, "id">>("cars")
      .insert({ brand, model, color, release_year, price })
      .returning("*");
    return res.status(201).json(car[0]);
  } catch {
    return res.status(500).json({ message: "Intern error from server" });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { brand, model, color, release_year, price } = req.body;

  try {
    const car = await knex<Car>("cars")
      .where({ id: Number(id) })
      .first();

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await knex<Car>("cars")
      .where({ id: Number(id) })
      .update({
        brand,
        model,
        color,
        release_year,
        price,
      });

    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: "Intern error from server" });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const car = await knex<Car>("cars")
      .where({ id: Number(id) })
      .first();

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await knex<Car>("cars")
      .where({ id: Number(id) })
      .del();

    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: "Intern error from server" });
  }
};
