// Importa o tipo de dados do Sequelize
const { DataTypes } = require('sequelize');
 
// Importa a instância configurada do Sequelize (conexão com o banco de dados)
const sequelize = require('../config/db');
 
// Define o modelo de Contato (Contact)
const Contact = sequelize.define('Contact', {
    // Campo ID: chave primária, número inteiro e autoincrementável
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
 
    // Campo nome do contato
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
    // Campo e-mail do contato
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
    // Campo mensagem do contato
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'contacts',
    timestamps: true,
});
 
// Exporta o modelo para ser utilizado em outras partes da aplicação
module.exports = Contact;
 
 