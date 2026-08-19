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

const getClient = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return error_res(req, res, "Falta el parametro :id.", 400, "MISSING_REQUIRED_FIELDS");
    }

    try {
        const getInfoClient = await clientService.get(id);

        if(getInfoClient.client_found) {
            return success_res(req, res, getAllClients, "¡Información obtenida!");
        } else {
            return error_res(req, res, "El cliente no fue encontrado.", 400, "MISSING_CLIENT");
        }

    } catch (error) {
        return error_res(req, res, "Ocurrio un problema al intentar obtener la información del cliente", 500, "INTERNAL_ERROR_A_GET_ALL_CLIENTS", error);
    }
}

const updateClient = async(req, res) => {
    const { id } = req.params;
    if(!id) {
        return error_res(req, res, "Falta el parametro :id.", 400, "MISSING_REQUIRED_FIELDS");
    }

    const data = req.body;
    if(!data || Object.keys(data).length === 0) {
        return error_res(req, res, "No se entregaron datos para actualizar.", 400, "NO_FIELDS_TO_UPDATE");
    }

    try {
        const updateInfoClient = await clientService.update(id, data);

        if(updateInfoClient.updated) {
            return success_res(req, res, updateInfoClient, "¡Cliente actualizado correctamente!");
        }

        if(updateInfoClient.reason === "CLIENT_NOT_FOUND") {
            return error_res(req, res, "El cliente no fue encontrado.", 404, "MISSING_CLIENT");
        }

        if(updateInfoClient.reason === "NO_FIELDS_TO_UPDATE") {
            return error_res(req, res, "No se entregaron campos válidos para actualizar.", 400, "NO_FIELDS_TO_UPDATE");
        }

        return error_res(req, res, "No fue posible actualizar el cliente.", 400, "CLIENT_UPDATE_FAILED");
    } catch (error) {
        return error_res(req, res, "Ocurrio un problema al intentar actualizar el cliente.", 500, "INTERNAL_ERROR_A_UPDATE_CLIENT", error);
    }
};
// ------------- CONTROLLER - Clients v1.0 -------------
module.exports = {
    createClient,
    listClients,
    getClient,
    updateClient
}