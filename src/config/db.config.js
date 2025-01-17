const mongoose = require('mongoose');

// String de conexão ao MongoDB (substitua pelos valores corretos)
const uri = 'mongodb+srv://<phestalise>:<hYDWHlwpQsCxig7l>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority';

// Função para conectar ao MongoDB
const connectMongo = async () => {
    try {
        await mongoose.connect(uri); // Não é mais necessário passar as opções
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Encerra a aplicação em caso de erro crítico
    }
};

module.exports = connectMongo;


//const uri = 'mongodb+srv://<phestalise>:<hYDWHlwpQsCxig7l>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority';