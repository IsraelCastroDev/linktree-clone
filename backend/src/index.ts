import server from "./server";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
);
