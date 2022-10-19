import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

export function Login() {

    const[contLogin, setContLogin] = useState<string>("");
    const[contSenha, setContSenha] = useState<string>("");

    const uri: string = "http://localhost:8080/usuario/";

    const conferirUsuario = async () => {
        const res = await fetch(uri+contLogin+"/"+contSenha);
        const usuario = await res.json();
        guardarIdUsuarioSessionStorage(usuario.id);
    }
    
    const guardarIdUsuarioSessionStorage = (idUsuario: string) => {
        sessionStorage.idUsu = idUsuario;
    }
    
    const logar = async () =>{
       await conferirUsuario();
    }

    return(
            <div id="panelLogin" className="container">
                <h1 className="h1">Login</h1>
                <input type="text" name="login" id="login" placeholder="Login" className="input" onChange={(e) => setContLogin(e.target.value)}/>
                <input type="password" name="senha" id="senha" placeholder="Senha" className="input" onChange={(e) => setContSenha(e.target.value)}/>
                <Link to="/home">
                    <button onClick={logar} className="button"> Entrar </button>
                </Link>    
                 <Link to="/cadastro">Não está cadastrado? Cadastre-se aqui!</Link>
            </div>
    )

}