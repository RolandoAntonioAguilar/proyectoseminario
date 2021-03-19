const { Router } = require("express");
const router = Router();

const usuarioController = require('../controllers/usuario');
const tools = require('../middlewares/tools');

router.get('/list', usuarioController.list);
router.post('/register', [tools.checkDuplicateEmail, usuarioController.register]);
router.post('/login', [tools.checkEmail, usuarioController.login]);

module.exports = router;