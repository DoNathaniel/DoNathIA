const db = require("../config/database");
const { in_http_log } = require("../utils/log.util");

const requestIdMiddleware = async (req, res, next) => {
    try {
        const genRequestId = crypto.randomUUID();
        const genAuditId = crypto.randomUUID();

        await db.query(`INSERT INTO requests_audit (id, request_id, method, path, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?);`,
            [
                genAuditId,
                genRequestId,
                req.method,
                req.originalUrl,
                req.ip,
                req.get("user-agent") || null,
            ]
        );

        req.requestId = genRequestId;
        req.auditId = genAuditId;
        req.startedAt = Date.now();

        res.setHeader("X-Request-Id", genRequestId);

        in_http_log(req, res);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = requestIdMiddleware;