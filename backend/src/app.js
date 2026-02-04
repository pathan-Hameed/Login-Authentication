// app configuration and server setup
import express from 'express';
import cors from 'cors';
import router from './routes/auth.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// routes will be used here
app.use('/auth', router);
app.use('/api', router);


export default app;