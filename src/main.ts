import express from "express";

const PORT = 80;
const HOST = "0.0.0.0";

const app = express();
app.get("/", (_req, res) => {
    res.send("Server healthy!");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
