  import { useEffect, useState } from 'react'
  import './login.css'

  export function Login() {
    const img_url = '../../../public/images/paisagem_cidade_anime.jpg'
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    function entrar(e){
      e.preventDefault();
        if(!email){
          alert("Preencher o campo email")
          return false
        }
        if(!senha){
          alert("Preencher o campo senha")
          return false
        }
        alert('Validado com sucesso')
    } 

    return (
      <div className='d-flex login-container flex-row'>
        <img src={img_url} alt="" className='w-75' />
        <div className="login w-25">
          <header className='container bg-primary p-4'>
              <h1 className='text-white text-center'>Login</h1>
          </header>
          <main className='container p-3 mt-5'>
            <input 
                type="text" 
                value={email}
                placeholder='email' 
                onChange={ e => setEmail(e.target.value)}
                className='form-control mt-5'
            />
            <p></p>
            <input 
                type="password" 
                value={senha}
                placeholder='senha' 
                onChange = {e => setSenha(e.target.value)}
                className='form-control mb-4'
            />
            <div className="d-flex gap-3">
                <button onClick={ entrar } className='btn btn-outline-primary w-50'>Entrar</button>
                <button className='btn btn-outline-warning w-50'>
                  <a href="../Cadastro/index.html" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark"> 
                    Cadastrar
                  </a>
                </button>
            </div>
          </main>
        </div>
        
      </div>
    )
  }
