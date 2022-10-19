import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cadastro.css';


export function Cadastro() {

    const[contLogin, setContLogin] = useState("");
    const[contSenha, setContSenha] = useState("");
    const[contNome, setContNome] = useState("");

    const criarUsuario = async () => {
        const doc = {
            login: contLogin,
            senha: contSenha,
            nome: contNome
        }
    
        await fetch('http://localhost:8080/usuario',{
            method: 'POST',
            body: JSON.stringify(doc),
            headers: {'Content-Type': 'application/json'}
        });
    }

    return(
        <div id="cadastro" className="container">
            <h1 className="h1">Cadastre-se</h1>
            <input type="text" name="login" id="login" placeholder="Login" className="input" onChange={(e) => setContLogin(e.target.value)}/>
            <input type="password" name="senha" id="senha" placeholder="Senha" className="input" onChange={(e) => setContSenha(e.target.value)}/>
            <input type="text" name="nome" id="nome" placeholder="Nome" className="input" onChange={(e) => setContNome(e.target.value)}/>
            <Link to="/">
                <button  className="button" onClick={criarUsuario}> Cadastrar </button>
            </Link>
        </div>
    
    )

}