const bcrypt = require('bcryptjs');
const User = require('../models/users');
 
 
 
exports.login =  async(req, res) => {
    try {
        const {email, password} = req.body;
 
        if (!email || !password) return res.status(400).json({message:'email e senha são obrigatorios'})
 
        const user = await User.findOne ({where: {email}})
 
        if(!user) return res.status(404).json({message:'usuario nao encontrado'})
        const passworldValid = await bcrypt.compare(password, user.password)
        if(!passworldValid) return res.status(400).json({message:'email ou senha incorretos'})
        res.json({message: 'login realizado com sucesso',
            user: {id: user.id, name : user.name, email: user.email}
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
 
    }
 
    }
 
// Importa a instância do Sequelize configurada e o modelo de usuário
const sequelize = require('./config/db');
require('dotenv').config();
const express = require('express')
 
const userRoutes = require('./routes/userRoutes')
const contactRoutes = require('./routes/contactRoutes')
const authRoutes = require('./routes/authRoutes')
 
const app = express();
 
app.use(express.json());
 
app.get('/', (req, res)=> res.send('api funcionando'))
 
app.use('/api/users', userRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
 
 
const PORT = process.env.PORT;
 
sequelize.authenticate()
  .then(() => {
    console.log('servidor online e conectado com o DB')
    return sequelize.sync();
  })
  .then(() =>{
    console.log('banco de dados sincronizado')
    app.listen(PORT, () => console.log("SERVIDOR RODANDO NA PORTA: " + PORT))
  }).catch(erro => console.log("Erro interno do servidor", erro))
 