import app from './app';
import dotenv from "dotenv";

const PORT = process.env.PORT;

dotenv.config();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});