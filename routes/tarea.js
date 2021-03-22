const { Router } = require("express");
const router = Router();

const tools = require('../middlewares/tools');

router.get('/tasks', tools.verifyToken, (req, res) => {
    res.json({ title: "tasks" });
});


module.exports = router;