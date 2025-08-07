// Importa a instância do Sequelize configurada e o modelo de usuário
const sequelize = require('./config/db');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const allowedOrigin = 'https://frontend-portal-turismo-zeta.vercel.app';

// Configuração do CORS com função para garantir exatidão da origem
app.use(cors({
  origin: function(origin, callback) {
    // Permite requests sem origem (como Postman ou chamadas internas)
    if (!origin) return callback(null, true);
    if (origin === allowedOrigin) {
      return callback(null, allowedOrigin);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200 // Para compatibilidade com browsers antigos
}));

// Middleware para lidar com requisições OPTIONS (preflight)
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => res.send('API funcionando'));

app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco MySQL!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados');
    app.listen(PORT, () => console.log("SERVIDOR RODANDO NA PORTA: " + PORT));
  })
  .catch(erro => console.log("Erro interno do servidor", erro));
