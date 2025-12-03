import api from './api';
/**
 * Carrega informações públicas de um salão (serviços, time, etc.)
 * @param {string} slug - O slug único do salão na URL (Ex: 'beleza-rn').
 */


export const getPublicData = async (slug: string) => {
    try {
        const response = await api.get(`/public/${slug}`); 
        return response.data;
    } catch (error: any) {
        // Tratar 404 de forma clara
        if (error.response && error.response.status === 404) {
            throw new Error("Salão não encontrado. Verifique o link.");
        }
        throw error;
    }
};

/**
 * Funções de Agendamento (Mock/Exemplo)
 */
export const getAvailableTimes = async (slug: string, professionalId: number, serviceId: number, date: string) => {
    // Exemplo de como usar a rota de horários livres:
    const url = `/public/${slug}/available-times/` + 
                `?professional_id=${professionalId}&service_id=${serviceId}&date=${date}`;
    const response = await api.get(url);
    return response.data;
};

// ... (Outras funções públicas, como createPublicScheduling) ...