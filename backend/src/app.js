// app configuration and server setup
import express from 'express';
import cors from 'cors';
//routes will be imported here

const app = express();
app.use(cors());
app.use(express.json());

// routes will be used here



export default app;