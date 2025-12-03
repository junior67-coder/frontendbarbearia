import api from './api'; // Importa a instância configurada


export const loginUser = async (email: string, password: string) => {
    try {
        // Endpoint: /api/v1/token/
        const response = await api.post('/token/', { 
            username: email, 
            password: password 
        }, {
            // Remove o interceptor 'Bearer' para esta rota, pois ainda não temos o token
            headers: {
                Authorization: undefined 
            }
        });

        const data = response.data;
        
        // Salva ambos os tokens no navegador
        localStorage.setItem('ACCESS_TOKEN', data.access); 
        localStorage.setItem('REFRESH_TOKEN', data.refresh); 
        
        return data.access; 

    } catch (error: Error | any) {
        // Axios coloca o erro na propriedade 'response.data'
        const errorMessage = error.response?.data?.detail || 'Credenciais inválidas. Tente novamente.';
        throw new Error(errorMessage);
    }
};


export const registerBarberShop = async (name: string, email: string, password: string) => {
    try {
        // Endpoint de Cadastro (público)
        const response = await api.post('salao/', {
            name: name,
            email: email,
            password_owner: password
        }, {
            // Garante que o interceptor JWT não atrapalhe esta requisição pública
            headers: {
                Authorization: undefined 
            }
        });

        return response.data;

    } catch (error: Error | any) {
        // ... (o tratamento de erro precisa ser ajustado para 'email_contato', 'nome', etc.)
        const errors = error.response?.data;
        
        if (errors?.email) { // <--- Ajustado
            throw new Error(`Email: ${errors.email[0]}`);
        }
        if (errors?.name) { // <--- Ajustado
            throw new Error(`Nome do Salão: ${errors.name[0]}`);
        }
        
        throw new Error('Erro ao cadastrar o salão. Verifique os dados.');
    }
};

export const logOutUser = () => {
    // Remove os tokens do armazenamento local
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
};
