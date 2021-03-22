const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
    .connect("mongodb://localhost:27017/lista-de-tareas", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then((db) => {
        console.log(
            "\nLa conexión se realizó correctamente."
        );
    })
    .catch((err) => {
        console.log("Error en la conexión: " + err);
    });
