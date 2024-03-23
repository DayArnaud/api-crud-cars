import "dotenv/config";
import express from "express";
import routes from "./router";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Servidor inicializado na porta 3000");
});
