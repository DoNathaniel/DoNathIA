exports.up = async function (knex) {
    await knex.raw(`
        CREATE TABLE requests_audit (
            id CHAR(36) NOT NULL,
            request_id CHAR(36) NOT NULL,
            client_id CHAR(36) NULL,

            method VARCHAR(10) NOT NULL,
            path VARCHAR(500) NOT NULL,

            ip_address VARCHAR(45) NULL,
            user_agent TEXT NULL,

            status ENUM('pending', 'success', 'error')
                NOT NULL
                DEFAULT 'pending',

            http_status SMALLINT UNSIGNED NULL,
            error_code VARCHAR(100) NULL,

            duration_ms INT UNSIGNED NULL,

            created_at TIMESTAMP
                NOT NULL
                DEFAULT CURRENT_TIMESTAMP,

            finished_at TIMESTAMP NULL,

            PRIMARY KEY (id),
            UNIQUE KEY uq_requests_audit_request_id (request_id),

            KEY idx_requests_audit_client_id (client_id),
            KEY idx_requests_audit_status (status),
            KEY idx_requests_audit_created_at (created_at)
        );
    `);
};

exports.down = async function (knex) {
    await knex.raw(`
        DROP TABLE requests_audit;
    `);
};