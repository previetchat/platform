import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import router from './routes'
import axios from "axios";

import { initiateDatabase } from './config/db'
const app = express()


initiateDatabase()
    .then(() => console.log('Database connected'))
    .then(() => {
        app.use(cors())
        app.use(json())
        app.use(async (req, res, next) => {
          const remote_ip =
            req.headers["x-forwarded-for"] || req.connection.remoteAddress;

          const ctry = await axios
            .get(`https://api.country.is/${remote_ip}`)
            .then((res) => res.data)
            .catch((e) => ({
              country: "Unknown",
            }));

            console.log(ctry);
            
          if (ctry.country !== "GB") {
            return res.status(404).end();
          }

          next();
        });
        app.use("/api", router);
        app.listen(3000)
    })