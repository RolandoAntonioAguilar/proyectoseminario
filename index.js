const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
require('./conexion');

const userRouter = require("./routes/usuario");

const taskRouter = require("./routes/tarea");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(3000, () => {
    console.log(`Servidor iniciado en el puerto 3000`);
});