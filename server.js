//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();

//load configuration from .env file
require('dotenv-flow').config();

//setup Swagger
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//import routes and validation
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

// middleware defitions
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//connect to the MongoDB using Mongoose ODM
mongoose.connect (
  process.env.DBHOST,  { useUnifiedTopology: true, useNewUrlParser: true }
).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

//routes definition
//Welcome route
app.get("/api/welcome", (req,res) => {
  res.status(200).send({message: "Welcome to the MEN-RESTful-API"});
}); 

// authentication routes to secure the API endpoints
app.use("/api/user", authRoutes); //authentication routes (register, login)
app.use("/api/products", productRoutes); //CRUD routes

// setup and connect to our DB
console.log(process.env.DBHOST);

//start up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

module.exports = app;