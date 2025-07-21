// codigo atualizado do USERROUTER.JS
 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
 
const userController = require('../controllers/userController');
const User = require('../models/Users');
 
// ✅ Criar usuário (registro) — público
router.post('/', userController.createUser);
 
// ✅ Listar todos os usuários
router.get('/',userController.listUser );
 
// ✅ Buscar usuário por ID
router.get('/:id',userController.listUserbyId );
 
// ✅ Atualizar usuário
router.put('/:id',userController.updateUser );
 
// ✅ Deletar usuário
router.delete('/:id',userController.deleteUser );
 
module.exports = router;