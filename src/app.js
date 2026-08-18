const express = require("express");
const app = express();

const adminKeyMiddleware = require("./middlewares/adminKey.middleware");
const requestIdMiddleware = require("./middlewares/requests.middleware");
const { success_res } = require("./utils/responses.util");

app.use(express.json());
app.use(requestIdMiddleware);

app.use("/api/clients/", adminKeyMiddleware, require("./routes/clients.routes"));
app.get("/health", (req, res) => {
    return success_res(req, res, { status: "ok" }, "ok_response");
});

module.exports = app;