import express from 'express';
import dotenv from 'dotenv';
import readingRoutes from './routes/readingRoutes';
import './models/Reading';

dotenv.config(); // Carregar as variáveis de ambiente do .env

const app = express();

app.use(express.json());
app.use('/api', readingRoutes);

const PORT = process.env.TEST_PORT || process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
