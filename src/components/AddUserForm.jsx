// src/components/AddUserForm.jsx
import React, { useState } from 'react';

// Recebe a função 'onUserAdded' como prop para notificar o App.jsx
function AddUserForm({ onUserAdded }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página padrão do form
    setIsLoading(true); // Inicia o carregamento

    try {
      // Chama a função passada por props, que por sua vez chama a API
      await onUserAdded({ nome, email, senha });
      // Limpa o formulário após sucesso
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      // O tratamento de erro mais específico (alert) já está na api.js
      // Poderíamos adicionar mais lógica aqui se necessário
      console.error("Falha ao adicionar usuário (componente):", error);
    } finally {
       setIsLoading(false); // Finaliza o carregamento (sucesso ou falha)
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
      <h3>Adicionar Novo Usuário</h3>
      <div>
        <label>Nome: </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Senha: </label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading} style={{ marginTop: '15px' }}>
        {isLoading ? 'Adicionando...' : 'Adicionar Usuário'}
      </button>
    </form>
  );
}

export default AddUserForm;