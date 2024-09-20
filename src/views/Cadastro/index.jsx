import { useState, useEffect } from "react";  // Importa os hooks useState e useEffect do React
import './cadastro.css';  // Importa o arquivo CSS para estilização

export function Cadastro(){
    // URL da imagem usada como plano de fundo
    const url_img = "https://img.freepik.com/free-photo/city-architecture-landscape-digital-art_23-2151065629.jpg?t=st=1726668935~exp=1726672535~hmac=022666b70e747543f6d7d7a18eb9e535c7a39d16f175c99d0076ace6b131b50a&w=1380";

    // Estados para armazenar o valor do email, senha, confirmação de senha, mensagem de erro e timeout de delay
    const [email, setEmail] = useState("");  // Estado para o email
    const [senha, setSenha] = useState("");  // Estado para a senha
    const [senhaConfirmada, setSenhaConfirmada] = useState("");  // Estado para a confirmação da senha
    const [mensagemErro, setMensagemErro] = useState("");  // Estado para a mensagem de erro/sucesso
    const [delayTimeout, setDelayTimeout] = useState(null);  // Estado para armazenar o timeout de delay

    // useEffect é usado para monitorar alterações na confirmação da senha e senha, com delay para validação
    useEffect(() => {
        // Se o campo de confirmação de senha estiver vazio, não exibe nenhuma mensagem
        if (senhaConfirmada === "") {
            setMensagemErro("");  // Limpa a mensagem
            return;
        }

        // Se já houver um timeout anterior em execução, ele é limpo (cancelado) antes de iniciar um novo
        if (delayTimeout) {
            clearTimeout(delayTimeout);  // Limpa o timeout anterior
        }

        // Define um timeout para que a comparação entre senhas ocorra após 500ms de inatividade
        const timeout = setTimeout(() => {
            // Compara as senhas: se forem diferentes, exibe a mensagem de erro, caso contrário, exibe sucesso
            if (senha !== senhaConfirmada) {
                setMensagemErro("As senhas não coincidem");  // Mensagem de erro
            } else {
                setMensagemErro("As senhas coincidem");  // Mensagem de sucesso
            }
        }, 500);  // Delay de 500ms

        setDelayTimeout(timeout);  // Armazena o timeout ativo no estado para uso futuro

        // Função de limpeza para cancelar o timeout se o componente for desmontado ou o campo de senha mudar
        return () => clearTimeout(timeout);  // Limpa o timeout quando o efeito é reexecutado ou desmontado
    }, [senhaConfirmada, senha]);  // O useEffect roda sempre que senha ou senhaConfirmada mudam

    // Função que será chamada ao tentar cadastrar (ao clicar no botão)
    function cadastrar(e){
        e.preventDefault();  // Previne o comportamento padrão de recarregar a página

        // Verifica se os campos estão preenchidos corretamente
        if(!email){
            alert("Preencher o campo email");  // Alerta se o email não for preenchido
            return;
        }
        if(!senha){
            alert("Preencher o campo senha");  // Alerta se a senha não for preenchida
            return;
        }
        if(!senhaConfirmada){
            alert("Preencher o campo de confirmação de senha");  // Alerta se a confirmação não for preenchida
            return;
        }

        // Checagem final antes de enviar o formulário
        if(senha !== senhaConfirmada){
            alert("As senhas não coincidem");  // Alerta se as senhas forem diferentes
            return;
        }

        alert('Cadastro validado com sucesso');  // Se todas as condições forem atendidas, exibe a mensagem de sucesso
    }

    return (
        // Estrutura da página de cadastro
        <div className='d-flex login-container flex-row'>
            {/* Imagem de fundo */}
            <img src={url_img} alt="" className='w-75' />
            
            <div className="login w-25">
                {/* Cabeçalho com título de Cadastro */}
                <header className='container bg-primary p-4'>
                    <h1 className='text-white text-center'>Cadastro</h1>
                </header>
                
                {/* Corpo principal do formulário de cadastro */}
                <main className='container p-3 mt-5'>
                    {/* Campo de entrada para o email */}
                    <input 
                        type="text" 
                        value={email}  // Valor do campo controlado pelo estado email
                        placeholder='Digite seu email'  // Texto de placeholder
                        onChange={ e => setEmail(e.target.value)}  // Atualiza o estado email quando o usuário digita
                        className='form-control mt-5'
                    />
                    <p></p>
                    
                    {/* Campo de entrada para a senha */}
                    <input 
                        type="password" 
                        value={senha}  // Valor do campo controlado pelo estado senha
                        placeholder='Digite sua senha'  // Texto de placeholder
                        onChange={ e => setSenha(e.target.value)}  // Atualiza o estado senha quando o usuário digita
                        className='form-control mb-4'
                    />
                    
                    {/* Campo de entrada para confirmar a senha */}
                    <input 
                        type="password" 
                        value={senhaConfirmada}  // Valor do campo controlado pelo estado senhaConfirmada
                        placeholder='Confirme sua senha'  // Texto de placeholder
                        onChange={ e => setSenhaConfirmada(e.target.value)}  // Atualiza o estado senhaConfirmada quando o usuário digita
                        className='form-control mb-4'
                    />
                    
                    {/* Exibe a mensagem de erro ou sucesso, dependendo do resultado da validação */}
                    <p className={mensagemErro === "As senhas coincidem" ? "text-success" : "text-danger"}>
                        {mensagemErro}  
                    </p>

                    {/* Botão de cadastro */}
                    <div className="d-flex gap-3">
                        <button onClick={cadastrar} className='btn btn-outline-primary w-50'>
                            Cadastrar
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
