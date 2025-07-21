const express = require('express');
const router = express.Router();
 
const Contact = require('../models/contact');
 
// ✅ Criar usuário (registro) — público
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
 
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
   
 
 
    // Cria o novo usuário
    const newContact = await Contact.create({ name, email, message });
 
    // Retorna os dados sem a senha
    const { id } = newContact;
    res.status(201).json({ id, name, email, message });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});
 
// ✅ Listar todos os usuários
router.get('/', async (_req, res) => {
  try {
    const contact = await Contact.findAll({
      attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
});
 
// ✅ Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
    });
 
    if (!contact) {
      return res.status(404).json({ message: 'contato não encontrado.' });
    }
 
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
});
 
 
module.exports = router;
 
 
 