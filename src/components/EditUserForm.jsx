import React, { useState } from 'react';

// Componente simples para o formulário de edição
function EditUserForm({ user, onUpdateUser, onCancel }) {
    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Chama a função de update passada por props
            await onUpdateUser(user.id, { nome, email });
            // Não precisamos limpar o form aqui, pois ele será fechado
        } catch (error) {
            console.error("Falha ao atualizar usuário (form):", error);
        } finally {
            setIsLoading(false);
            // onCancel(); // Opcional: fechar automaticamente após tentar salvar? Ou só no botão Cancelar?
            // Vamos deixar para fechar apenas no botão Cancelar ou após sucesso no App.jsx
        }
    };

    return (
         // Estilo básico para simular um modal ou área de edição
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '30px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 1000, /* Para ficar sobre outros elementos */
            minWidth: '300px'
        }}>
            <h3>Editar Usuário</h3>
            <form onSubmit={handleSubmit}>
                {/* ID é mostrado apenas para informação, não editável */}
                <p>ID: {user.id}</p>
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
                 {/* Não incluímos campo de senha na edição aqui */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                    {/* Botão para cancelar a edição */}
                    <button type="button" onClick={onCancel} disabled={isLoading}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditUserForm;