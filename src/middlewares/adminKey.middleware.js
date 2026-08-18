const { error_res } = require("../utils/responses.util");

const adminKey = (req, res, next) => {
    if(req.headers["authorization"] !== process.env.ADMIN_KEY) {
        return error_res(req, res, "La key de administrador no es valida.", 401, "NO-ADMIN-KEY");
    }
    
    next();
}

module.exports = adminKey;