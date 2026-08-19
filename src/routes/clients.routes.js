const API = require("express").Router();
// ------------- API - Clients v1.0 -------------
const { createClient, listClients, getClient, updateClient } = require("../controllers/clients.controller");
// ------------- API - Clients v1.0 -------------
API.post("/", createClient);
API.get("/", listClients);
API.get("/:id", getClient);
API.patch("/:id", updateClient);
// ------------- API - Clients v1.0 -------------
module.exports = API;