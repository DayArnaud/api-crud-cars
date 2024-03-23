"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.addCar = exports.viewCar = exports.carsList = void 0;
const dbConnection_1 = require("../database/dbConnection");
const carsList = async (_, res) => {
    try {
        const cars = await (0, dbConnection_1.knex)("cars");
        return res.json(cars);
    }
    catch (_a) {
        return res.status(500).json({ message: "Intern error from server" });
    }
};
exports.carsList = carsList;
const viewCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, dbConnection_1.knex)("cars")
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.json(car);
    }
    catch (_a) {
        return res.status(500).json({ message: "Intern error from server" });
    }
};
exports.viewCar = viewCar;
const addCar = async (req, res) => {
    const { brand, model, color, release_year, price } = req.body;
    try {
        const car = await (0, dbConnection_1.knex)("cars")
            .insert({ brand, model, color, release_year, price })
            .returning("*");
        return res.status(201).json(car[0]);
    }
    catch (_a) {
        return res.status(500).json({ message: "Intern error from server" });
    }
};
exports.addCar = addCar;
const updateCar = async (req, res) => {
    const { id } = req.params;
    const { brand, model, color, release_year, price } = req.body;
    try {
        const car = await (0, dbConnection_1.knex)("cars")
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        await (0, dbConnection_1.knex)("cars")
            .where({ id: Number(id) })
            .update({
            brand,
            model,
            color,
            release_year,
            price,
        });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: "Intern error from server" });
    }
};
exports.updateCar = updateCar;
const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, dbConnection_1.knex)("cars")
            .where({ id: Number(id) })
            .first();
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        await (0, dbConnection_1.knex)("cars")
            .where({ id: Number(id) })
            .del();
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ message: "Intern error from server" });
    }
};
exports.deleteCar = deleteCar;
