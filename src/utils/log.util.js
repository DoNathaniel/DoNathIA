const in_http_log = (req, res) => {
    console.log(`<-- ${req.method} ${req.originalUrl}`);
}

const out_http_log = (req, res, ms, code, error_response = false) => {
    if(error_response) {
        console.error(`--> ${req.method} ${req.originalUrl} -- ${ms}ms -- ${code}`);
    } else {
        console.log(`--> ${req.method} ${req.originalUrl} -- ${ms}ms -- ${code}`);
    }
}

module.exports = {
    in_http_log, 
    out_http_log
}