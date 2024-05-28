import express, { Express } from "express";
import digimonRouter from "./Routes/digimon.routes"
import { setupSwagger } from './swagger';

const app: Express = express();

app.use('/digimon', digimonRouter)
app.use(express.json());

setupSwagger(app);

export default app;