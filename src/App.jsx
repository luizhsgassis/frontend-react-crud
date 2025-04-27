// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import * as api from './services/api'; // Importa todas as funções exportadas da api.js
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import './App.css'; // Você pode adicionar estilos aqui

function App() {
  const [users, setUsers] = useState([]); // Estado para a lista de usuários
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento da lista
  const [error, setError] = useState(null); // Estado para erros ao buscar lista

  // Estado para controlar qual usuário está sendo editado
  const [editingUser, setEditingUser] = useState(null); // null significa que nenhum usuário está sendo editado

  // Função para buscar usuários da API
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Falha ao carregar usuários.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback para evitar recriação da função a cada render

  // useEffect para buscar usuários quando o componente montar
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Dependência fetchUsers garante que só roda se a função mudar (o que não deve acontecer com useCallback vazio)

  // Função para ADICIONAR usuário (será passada para AddUserForm)
  const handleAddUser = async (userData) => {
    try {
      const newUser = await api.createUser(userData);
      // Atualiza o estado local adicionando o novo usuário à lista existente
      setUsers(prevUsers => [...prevUsers, newUser]);
      // Poderia também chamar fetchUsers() novamente, mas atualizar o estado local é mais rápido
    } catch (error) {
      // O erro já foi logado e talvez mostrado em alert na api.js
      // Podemos adicionar feedback extra aqui se necessário
      console.error("Erro ao adicionar no App.jsx:", error);
      // Rethrow para que o form saiba que falhou (se necessário)
      throw error;
    }
  };

  // Função para DELETAR usuário (será passada para UserList)
  const handleDeleteUser = async (userId) => {
    try {
      await api.deleteUser(userId);
      // Atualiza o estado local removendo o usuário deletado
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      // Poderia também chamar fetchUsers() novamente
    } catch (error) {
      // O erro já foi logado e talvez mostrado em alert na api.js
      console.error("Erro ao deletar no App.jsx:", error);
    }
  };

  // Função para INICIAR a edição (chamada pela UserList)
  const handleEditUserStart = (user) => {
    setEditingUser(user); // Define o usuário que está sendo editado
  };

  // Função para CANCELAR a edição (chamada pelo EditUserForm)
  const handleEditCancel = () => {
    setEditingUser(null); // Limpa o estado de edição
  };

  // Função para ATUALIZAR o usuário (chamada pelo EditUserForm)
  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const updatedUser = await api.updateUser(userId, updatedData);
      // Atualiza a lista localmente
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? updatedUser : user
        )
      );
      setEditingUser(null); // Fecha o formulário/modal de edição após sucesso
      // Poderia chamar fetchUsers() novamente, mas atualizar localmente é mais rápido
    } catch (error) {
      console.error("Erro ao atualizar usuário no App.jsx:", error);
      // O erro (alert) já foi tratado na api.js
      // Você pode querer manter o modal aberto em caso de erro, ou fechá-lo.
      // setEditingUser(null); // Descomente se quiser fechar mesmo com erro
      throw error; // Rethrow para o EditUserForm saber da falha
    }
  };

  // --- Renderização ---
  return (
    <div className="App">
      <h1>Gerenciamento de Usuários (React + Firebase API)</h1>

      {/* Formulário para adicionar usuários */}
      <AddUserForm onUserAdded={handleAddUser} />

      <hr />

      {/* Exibição da lista de usuários */}
      {isLoading && <p>Carregando usuários...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && (
        <UserList
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUserStart}
        />
      )}

      {/* Formulário/Modal de Edição (só mostra se editingUser não for null) */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onUpdateUser={handleUpdateUser}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
}

export default App;