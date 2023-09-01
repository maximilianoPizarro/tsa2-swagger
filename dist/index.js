"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressBasicAuth = _interopRequireDefault(require("express-basic-auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***************************************************/
// Setup CORS y Auth

/***************************************************/
const app = (0, _express.default)(); // USE_CORS=0 para disablear

const useCors = process.env.USE_CORS || 1;
if (useCors) app.use((0, _cors.default)());
app.use(_bodyParser.default.json());

if (process.env.API_USER && process.env.API_PASS) {
  var users = {};
  users[process.env.API_USER] = process.env.API_PASS;
  app.use((0, _expressBasicAuth.default)({
    users: users,
    challenge: true
  }));
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