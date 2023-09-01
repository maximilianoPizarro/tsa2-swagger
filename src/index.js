import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import basicAuth from 'express-basic-auth';


/***************************************************/
// Setup CORS y Auth
/***************************************************/
const app = express();

// USE_CORS=0 para disablear
const useCors = process.env.USE_CORS || 1;
if (useCors) app.use(cors());

app.use(bodyParser.json());

if (process.env.API_USER && process.env.API_PASS) {
  var users = {};
  users[process.env.API_USER] = process.env.API_PASS;

  app.use(
    basicAuth({
      users: users,
      challenge: true
    })
  );
} else {
  console.log('El servidor es PUBLICO');
}

/**
 * Server port
 */

let port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => console.log(`TSA2 SWAGGER corriendo en ${port}!`));


/**
 * Swagger
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));