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

const get = async(id_client) => {
    const [queryClients] = await db.query("SELECT * FROM api_clients WHERE id = ?", [id_client])
    if(!queryClients[0]) {
        return {
            client_found: false,
            client: {}
        }
    }

    return {
        client_found: true,
        client: queryClients[0]
    }
}

const update = async (id_client, data) => {
    const allowedFields = ["name", "description", "active"];
    const fields = [];
    const values = [];

    for(const field of allowedFields) {
        if(data[field] !== undefined) {
            fields.push(`${field} = ?`);
            values.push(data[field]);
        }
    }

    if(fields.length === 0) {
        return {
            updated: false,
            reason: "NO_FIELDS_TO_UPDATE",
            client: {}
        };
    }

    values.push(id_client);

    const sql = `
        UPDATE api_clients
        SET ${fields.join(", ")}
        WHERE id = ?
    `;

    const [result] = await db.query(sql, values);

    if(result.affectedRows === 0) {
        return {
            updated: false,
            reason: "CLIENT_NOT_FOUND",
            client: {}
        };
    }

    const [queryClient] = await db.query(
        "SELECT * FROM api_clients WHERE id = ?",
        [id_client]
    );

    return {
        updated: true,
        reason: null,
        client: queryClient[0]
    };
};
// ------------- SERVICES - Clients v1.0 -------------
module.exports = {
    create,
    getAll,
    get,
    update
};