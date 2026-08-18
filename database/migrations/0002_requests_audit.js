exports.up = async function (knex) {
    await knex.schema.createTable("requests_audit", (table) => {
        table.uuid("id").primary();

        table.uuid("request_id").notNullable().unique();

        table.uuid("client_id").nullable();

        table.string("method", 10).notNullable();
        table.string("path", 500).notNullable();

        table.string("ip_address", 45).nullable();
        table.text("user_agent").nullable();

        table
            .enum("status", ["pending", "success", "error"])
            .notNullable()
            .defaultTo("pending");

        table.specificType("http_status", "SMALLINT UNSIGNED").nullable();

        table.string("error_code", 100).nullable();

        table.specificType("duration_ms", "INT UNSIGNED").nullable();

        table
            .timestamp("created_at")
            .notNullable()
            .defaultTo(knex.fn.now());

        table.timestamp("finished_at").nullable();

        table.index("request_id", "idx_requests_audit_request_id");
        table.index("client_id", "idx_requests_audit_client_id");
        table.index("status", "idx_requests_audit_status");
        table.index("created_at", "idx_requests_audit_created_at");
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable("requests_audit");
};