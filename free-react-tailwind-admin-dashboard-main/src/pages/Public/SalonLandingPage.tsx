import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPublicData } from '../../services/publicServices'; // Funções públicas
// Importe a função de login/cadastro para o redirecionamento
// import { loginUser } from '../../services/authServices'; 


export default function SalonLandingPage() {
  // O hook useParams está correto, ele pega o valor real da URL
  const { slug } = useParams(); 
  const navigate = useNavigate(); 

  const [salon, setSalon] = useState(null);
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função de Carregamento de Dados da API Pública
  const loadPublicData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 🚨 Aqui ele passa o valor correto (ex: 'beleza-rn')
      const data = await getPublicData(slug); 
      
      setSalon(data.salon_info);
      setServices(data.services);
      setProfessionals(data.professionals);
    } catch (err: any) {
      // Trata o erro 404 da requisição (se o salão não existir)
      console.error("Erro ao carregar dados públicos:", err);
      setError(err.message || "Não foi possível carregar as informações deste salão.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadPublicData();
  }, [loadPublicData]);
  
  // Função de Bloqueio/Redirecionamento
  const handleScheduleClick = (serviceId) => {
    alert("Agendar requer Login/Cadastro. Redirecionando...");
    navigate('/signup'); // Leva o cliente para a tela de Cadastro
  };
  
  // Renderização Condicional
  if (loading) {
    return <div className="p-8 text-center">Carregando informações do salão...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600 bg-red-100">{error}</div>;
  }

  if (!salon) {
    return <div className="p-8 text-gray-700">Salão não encontrado ou inativo.</div>;
  }


  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      
      {/* HEADER DO SALÃO */}
      <header className="py-8 text-white bg-brand-700 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-center">{salon.name}</h1>
        <p className="mt-1 text-center text-lg">{salon.address || "Endereço Não Informado"}</p>
      </header>

      {/* SEÇÃO DE SERVIÇOS */}
      <section className="max-w-4xl mx-auto mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">Serviços Disponíveis</h2>
        <div className="space-y-4">
          {services.map(service => (
            <div key={service.id} className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{service.name}</h3>
                <p className="text-sm text-gray-500">Duração: {service.minutes_duration} min</p>
              </div>
              <div className="text-right">
                {/* Assegure que service.value está formatado corretamente no backend */}
                <span className="block text-lg font-bold text-brand-600">R$ {service.value}</span> 
                <button 
                  onClick={() => handleScheduleClick(service.id)}
                  className="px-3 py-1 mt-1 text-sm text-white transition bg-brand-500 rounded hover:bg-brand-600"
                >
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* SEÇÃO DE TIME */}
      <section className="max-w-4xl mx-auto mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">Nossa Equipe</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {professionals.map(professional => (
            <div key={professional.id} className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{professional.name}</h3>
              <p className="text-sm text-gray-500">Especialista</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
