// src/services/api.js
import axios from 'axios';

// Cria uma instância do Axios com a URL base definida no .env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Vite usa import.meta.env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para buscar todos os usuários
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/'); // Chama GET para a baseURL ('/usuarios')
    return response.data; // Retorna a lista de usuários
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error; // Re-lança o erro para ser tratado no componente
  }
};

// Função para criar um novo usuário
// userData deve ser um objeto { nome, email, senha }
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/', userData); // Chama POST para '/' com os dados
    return response.data; // Retorna o usuário criado (com ID e links)
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    // Você pode querer tratar erros específicos aqui (ex: email duplicado)
    if (error.response && error.response.status === 409) {
        alert('Erro: Este email já está cadastrado.');
    } else {
        alert('Ocorreu um erro ao criar o usuário.');
    }
    throw error;
  }
};

// Função para atualizar um usuário
// userId é o ID do usuário, userData é { nome, email }
export const updateUser = async (userId, userData) => {
  try {
    // Axios não tem um método put específico para dados no corpo e URL params juntos de forma simples como get/post
    // A URL completa é montada aqui.
    const response = await apiClient.put(`/${userId}`, userData); // Chama PUT para '/:id' com os dados
    return response.data; // Retorna o usuário atualizado
  } catch (error) {
    console.error(`Erro ao atualizar usuário ${userId}:`, error);
     if (error.response && error.response.status === 409) {
        alert('Erro: Este email já está sendo usado por outro usuário.');
    } else {
        alert('Ocorreu um erro ao atualizar o usuário.');
    }
    throw error;
  }
};


// Função para deletar um usuário
export const deleteUser = async (userId) => {
  try {
    // A URL completa é montada aqui.
    const response = await apiClient.delete(`/${userId}`); // Chama DELETE para '/:id'
    return response.status; // Retorna o status (esperado 204)
  } catch (error) {
    console.error(`Erro ao deletar usuário ${userId}:`, error);
    alert('Ocorreu um erro ao deletar o usuário.');
    throw error;
  }
};

// Opcional: Função para buscar um usuário por ID (se precisar dos detalhes em algum lugar)
export const getUserById = async (userId) => {
    try {
        const response = await apiClient.get(`/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar usuário ${userId}:`, error);
        throw error;
    }
};