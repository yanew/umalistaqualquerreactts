import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../components/Item';
import '../styles/home.css';
import logout from '../images/logout.png';
import {IItem} from '../interfaces/IItem';

export function Home() {
  
  const[conteudoItem, setConteudoItem] = useState<string>("");
  const[itens, setItens]= useState<IItem[]>([]);
  const[idItem, setIdItem] = useState<string>("");
  const[start, setStart] = useState<boolean>(true);
  const[adicionar, setAdicionar] = useState<boolean>(true);
  const[idUsuario, setIdUsuario] = useState<string>("");

  const atualizarUsuario = async () =>{

    const uri = 'http://localhost:8080/usuario/'+ sessionStorage.idUsu;   
    const res = await fetch(uri);
    const usuario = await res.json();

    const novoItem = {conteudo: conteudoItem}
    const listaAtualizada = {listaItensDto:[...usuario.listaItensDto, novoItem]}
    const usuarioTemp = {...usuario, ...listaAtualizada}
    
    await fetch(uri,{
        method: 'PUT',
        body: JSON.stringify(usuarioTemp),
        headers: {'Content-Type': 'application/json'}
    });

    setConteudoItem("");

  }

  const selecionarItem = async (it:IItem)=>{

    const uri = 'http://localhost:8080/usuario/'+ sessionStorage.idUsu;   
    const res = await fetch(uri);
    const usuario = await res.json();

    setConteudoItem(it.conteudo);
    setIdItem(it.id);
    setIdUsuario(usuario.id);
    setAdicionar(false);
  }

  const atualizarItem = async () => {
    const doc = {
        conteudo: conteudoItem,
        idUsuario: idUsuario
    }

    await fetch('http://localhost:8080/item/'+ idItem,{
        method: 'PUT',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    });

    setConteudoItem("");
    setAdicionar(true);
}

  useEffect(() => {
    setTimeout(() => {
    const inicializar = async ()=>{
      if(sessionStorage.idUsu!=undefined){
        const uri = 'http://localhost:8080/usuario/'+ sessionStorage.idUsu;   
        const res = await fetch(uri);
        const usuario = await res.json();
    
        setItens(usuario.listaItensDto);
      }else{
        console.log('idUsu undefined ', sessionStorage.idUsu);
      }
    }

    if(start){
      inicializar();
      setStart(false);
    }
    
  },500)}, [itens, start]);

  return (
    <div id='container' className="container">
       <header>
          <h1>Olá, {sessionStorage.nomeUsu}</h1>
          <Link to="/">
            <img src={logout} width="20" height="20" alt='Sair'/>
          </Link>
        </header>

        <input id="inputItem"
          type="text"
          name="inItem"
          placeholder="Digite o item..."
          value={conteudoItem}
          onChange={(e) => setConteudoItem(e.target.value)}
        />

        {adicionar && <button id="botaoAdicionarItem" type="button" onClick={atualizarUsuario}>
            Adicionar
          </button> 
          }

          {!adicionar && <button id="botaoAtualizarItem" type="button" onClick={atualizarItem}>
            Atualizar
          </button> 
          }

        <div id="cartaoItem" className="cartaoItem">
          {itens!=undefined && itens.map((item)=>(
            <Item key= {item.id} id = {item.id} conteudo= {item.conteudo} selecionaItem={(item) => selecionarItem(item)}/>
          ))
          }
        </div>

    </div>
  )
}

