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

exports.listTask = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      if (!id) res.json({ error, message: `El id de la tarea es necesario` });
  
      const tasks = await Task.findById({ _id: id }, { user: 0 });
      if (!tasks) res.json({ error, message: `Error al listar la tarea` });
      res.json(tasks);
    } catch (error) {
      res.status(400).json({ error, message: `Error al listar la tarea` });
    }
  };
  
  exports.createTask = async (req, res, next) => {
    const { title, description } = req.body;
    try {
      const newTask = Task({
        title,
        description,
        user: await User.getTokenId(req),
      });
      await newTask.save();
  
      res.json({ message: `Tarea creada` });
    } catch (error) {
      res.status(400).json({ error, message: `Error al crear la tarea` });
    }
  };

  exports.updateTask = async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;
    try {
      const task = await Task.findByIdAndUpdate(
        { _id: id },
        {
          title,
          description,
        }
      );
      if (!task)
        res.status(400).json({ error, message: `Error actualizar la tarea` });
  
      res.json({ message: `Tarea actualizada` });
    } catch (error) {
      res.status(400).json({ error, message: `Error actualizar la tarea` });
    }
  };