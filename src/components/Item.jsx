import edit from '../images/edit.png';
import lixeira from '../images/lixeira.png';

import '../styles/item.css';

export function Item(item) {

    const deleteItem = async () => {
        await fetch('http://localhost:8080/item/' + item.id,{
            method: 'DELETE'
        });
    }

    return(
        <div className="item" id= {item.id}>
            <div className="painelTextoItem">
                <span >{item.conteudo}</span>
            </div>
            <div className="painelBotoes">
                <a className="link" onClick={() => item.selecionarItem(item)}>
                    <img src={edit} width="20" height="20"/>
                </a>
                <a className="link" onClick={deleteItem}>
                    <img src={lixeira} width="20" height="20"/>
                </a>
            </div>
        </div>
    );
}