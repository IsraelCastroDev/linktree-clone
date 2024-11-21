import express from "express";
import router from "./router";
import cors from "cors";
import { corsConfig } from "./config/cors";

const server = express();

server.use(cors(corsConfig));

server.use(express.json());
server.use(router);

export default server;
