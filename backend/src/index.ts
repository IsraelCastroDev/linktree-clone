import server from "./server";
import { connectDB } from "./config/db";
import "dotenv/config";

connectDB();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
);
