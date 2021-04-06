const { Router } = require("express");
const router = Router();

const usuarioController = require('../controllers/usuario');
const tools = require('../middlewares/tools');

// Solo para pruebas en desarrollo
// router.get('/list', usuarioController.list);
router.post('/register', [tools.checkDuplicateEmail, usuarioController.register]);
router.post('/login', [tools.checkEmail, usuarioController.login]);
router.post('/send_mail', [tools.checkEmailExist, usuarioController.sendMail]);
router.post('/restore_password', usuarioController.restorePassword);
router.post('/restore_password/:token', usuarioController.restorePassword);
router.post('/verified_token/:token', usuarioController.verfiedToken);

module.exports = router;