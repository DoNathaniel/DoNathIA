const db = require("../config/database");

const success_res = async (req, res, data = null, message = null, status = 200) => {
    const durationMs = Date.now() - req.startedAt;

    await db.query(
        `
      UPDATE requests_audit
      SET
        status = 'success',
        http_status = ?,
        duration_ms = ?,
        finished_at = NOW()
      WHERE id = ?;
    `,
        [
            status,
            durationMs,
            req.auditId
        ]
    );

    return res.status(status).json({
        requests: {
            status,
            requestId: req.requestId,
            success: true,
        },
        message,
        data,
    });
};


const error_res = async (req, res, message = "Ha ocurrido un error", status = 500, code = "INTERNAL_ERROR", err = null) => {
    const durationMs = Date.now() - req.startedAt;

    await db.query(
        `
      UPDATE requests_audit
      SET
        status = 'error',
        http_status = ?,
        error_code = ?,
        duration_ms = ?,
        finished_at = NOW()
      WHERE id = ?;
    `,
        [
            status,
            code,
            durationMs,
            req.auditId
        ]
    );

    return res.status(status).json({
        requests: {
            status,
            requestId: req.requestId,
            success: false,
        },
        error: {
            code,
            message,
            err
        },
    });
};


module.exports = {
    success_res,
    error_res,
};