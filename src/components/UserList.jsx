// src/components/UserList.jsx
import React from 'react';

// Recebe a lista de 'users' e a função 'onDeleteUser' como props
function UserList({ users, onDeleteUser, onEditUser }) {

  if (!users || users.length === 0) {
    return <p>Nenhum usuário cadastrado ainda.</p>;
  }

  const handleDelete = async (userId) => {
    // Confirmação antes de deletar
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
       try {
         await onDeleteUser(userId); // Chama a função passada por props
       } catch (error) {
         console.error("Falha ao deletar usuário (componente):", error);
         // O alert de erro já está na api.js
       }
    }
  };

  // Função para chamar o início da edição
  const handleEdit = (user) => {
    onEditUser(user); // Chama a função passada por props com o objeto do usuário
  };

  return (
    <div>
      <h3>Lista de Usuários</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <strong>{user.nome}</strong> ({user.email})
              {/* Mostrando links HATEOAS */}
              {user._links && (
                 <div style={{ fontSize: '0.8em', marginTop: '5px' }}>
                    Links:
                    {user._links.map(link => (
                        <a key={link.rel} href={link.href} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '5px'}} title={`${link.method} ${link.rel}`}>
                           [{link.rel}]
                        </a>
                    ))}
                 </div>
              )}
            </span>
            <span> {/* Agrupar botões */}
                <button onClick={() => handleEdit(user)} style={{ marginRight: '5px' }}>
                   Editar
                </button>
                <button onClick={() => handleDelete(user.id)}>
                   Excluir
                </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;