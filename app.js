import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import config from './config/index.js';
import errorHandler from "./controllers/error.controller.js"
import CustomError from "./utils/CustomError.js"
dotenv.config();


const app = express();


import schoolRoutes from './routers/school.routes.js';



app.use(express.json({ limit: '10mb' }));



app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials,
  methods: config.cors.methods,
}))

app.use(schoolRoutes);



app.use((req, res, next) => {
  const err = new CustomError(`can't find this route ${req.originalUrl} on server`, 404);
  next(err)
})

app.use(errorHandler)


export default app;
