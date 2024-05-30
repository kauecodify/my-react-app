const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = 3000;
const API_BASE_URL = 'http://localhost:8080/api/auth';

app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, confirmPassword, cpf } = req.body;

        // Verificação simples se a senha e a confirmação de senha correspondem
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Realizar requisição POST para a API de autenticação
        const response = await axios.post(`${API_BASE_URL}/signup`, {
            name,
            email,
            password,
            confirmPassword,
            cpf
        });

        // Retorna a resposta recebida da API de autenticação
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response.data);
        res.status(error.response.status).json(error.response.data);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
