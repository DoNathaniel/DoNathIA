const API = require("express").Router();
// ------------- API - Clients v1.0 -------------
const { createClient, listClients } = require("../controllers/clients.controller");
// ------------- API - Clients v1.0 -------------
API.post("/", createClient);
API.get("/", listClients);
// ------------- API - Clients v1.0 -------------
module.exports = API;