// ------------- CONTROLLER - Clients v1.0 -------------
const clientService = require("../services/clients.services");
const { error_res, success_res } = require("../utils/responses.util");
// ------------- CONTROLLER - Clients v1.0 -------------
const createClient = async(req, res) => {
    const { name, description } = req.body;
    if(!name || !description || name.length > 149 || name.length < 5) {
        return error_res(req, res, "Los parametros ingresados no son los correctos. (name, description)", 400, "MISSING_REQUIRED_FIELDS");
    }

    try {
        const createClient = await clientService.create({name, description});

        return success_res(req, res, createClient, "¡El cliente fue creado!");
    } catch (error) {
        return error_res(req, res, "Ocurrio un problema al intentar crear el cliente", 500, "INTERNAL_ERROR_A_CREATE_CLIENT", error);
    }
}

const listClients = async(req, res) => {
    try {
        const getAllClients = await clientService.getAll();

        return success_res(req, res, getAllClients, "¡Lista generada!");
    } catch (error) {
        return error_res(req, res, "Ocurrio un problema al intentar obtener los clientes", 500, "INTERNAL_ERROR_A_GET_ALL_CLIENTS", error);
    }
}
// ------------- CONTROLLER - Clients v1.0 -------------
module.exports = {
    createClient,
    listClients
}