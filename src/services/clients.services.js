const crypto = require("crypto");
const db = require("../config/database");

// ------------- SERVICES - Clients v1.0 -------------
const create = async (data) => {
    const clientId = crypto.randomUUID();
    const { name, description = null } = data;

    await db.query(`INSERT INTO api_clients (id, name, description, active) VALUES (?, ?, ?, ?);`,
        [
            clientId,
            name,
            description,
            true
        ]
    );

    return {
        id: clientId,
        name,
        description,
        active: true
    };
};

const getAll = async() => {
    const [queryClients] = await db.query("SELECT * FROM api_clients;")
    return {
        clients: queryClients,
        client_len: queryClients.length,
    }
}
// ------------- SERVICES - Clients v1.0 -------------
module.exports = {
    create,
    getAll
};