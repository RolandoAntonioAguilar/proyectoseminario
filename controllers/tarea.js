const Task = require("../models/tarea");
const User = require("../models/usuario");

exports.listTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find(
      { user: await User.getTokenId(req) },
      { user: 0 }
    );
    if (!tasks) res.json({ error, message: `No se encontraron tareas` });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error, message: `Error al listar las tareas` });
  }
};