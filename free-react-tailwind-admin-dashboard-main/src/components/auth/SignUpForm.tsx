import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { registerBarberShop } from "../../services/authServices"; 

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";


export default function SignUpForm() {
  const [barbershopName, setBarbershopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Estados existentes
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  const navigate = useNavigate();

  // --- FUNÇÃO HANDLER DE SUBMISSÃO ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!barbershopName || !email || !password) {
      setError("Por favor, preencha o nome do salão, email e senha.");
      return;
    }

    if (!isChecked) {
        setError("Você deve concordar com os Termos e Condições.");
        return;
    }
    
    setLoading(true);

    try {
      // Chama a função de serviço (POST para /api/v1/barbershop/)
      await registerBarberShop(barbershopName, email, password);
      
      console.log("Cadastro de Salão Sucedido!");
      
      // Sucesso: Redireciona para o Login
      navigate("/signin"); 

    } catch (err: any) {
      // Captura e exibe o erro retornado da API (ex: email já cadastrado)
      console.error("Erro de Cadastro:", err.message);
      setError(err.message || "Falha no cadastro. Tente outro email.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        {/* Link alterado para usar o Link do react-router-dom */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            {/* ... Botões de Login Social ... */}
            <div className="relative py-3 sm:py-5">
                {/* ... Divisor "Or" ... */}
            </div>
            
            {/* --- Formulário Principal com Lógica de Cadastro --- */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                 {/* --- Mensagem de Erro (Feedback da API) --- */}
                {error && (
                    <div className="p-3 mb-4 text-sm font-medium text-error-700 bg-error-100 rounded-lg dark:bg-error-900/50 dark:text-error-400">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* */}
                  <div className="sm:col-span-2">
                    <Label>
                      Nome do Salão<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="barbershopName"
                      name="barbershopName"
                      placeholder="Ex: Salão Beleza RN"
                      value={barbershopName}
                      onChange={(e) => setBarbershopName(e.target.value)}
                    />
                  </div>
                </div>
                {/* */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Ao criar uma conta, você concorda com os{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Termos e Condições,
                    </span>{" "}
                    e nossa{" "}
                    <span className="text-gray-800 dark:text-white">
                      Política de Privacidade
                    </span>
                  </p>
                </div>
                {/* */}
                <div>
                    <Button
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
