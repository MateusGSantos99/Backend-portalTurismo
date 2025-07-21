const Contact = require('../models/contact');
exports.createContact = async (req, res) => {
    try {
      const { name, email, message } = req.body;
   
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Todos os campos são obrigatório' });
      }
      const newContact = await Contact.create({ name, email, message });
      const { id } = newContact;
      res.status(201).json({ id, name, email, message });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
  exports.listContacts =  async (_req, res) => {
    try {
      const contact = await Contact.findAll({
        attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
      });
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
  }
 
 