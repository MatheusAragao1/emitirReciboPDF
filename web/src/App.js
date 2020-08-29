import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './bootstrap.min.css'

function App() {
  
  const [nomeEmpresa, setNomeEmpresa] = useState(window.localStorage.getItem('nomeEmpresa') || '');
  const [nomeCliente, setNomeCliente] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');
  const [desconto, setDesconto] = useState(0);
  const [itens, setItens] = useState([
      { desc: '', preco: 0, qtd: 0 }
  ]);

  useEffect(() => {
    window.localStorage.setItem('nomeEmpresa' ,nomeEmpresa)
  }, [nomeEmpresa])

  function addNewItem(){
    setItens([
        ...itens,
        { desc: '', preco: 0, qtd: 0 }
    ]);        
}

  function setScheduleItemValue(position, field, value){
    const updatedItems = itens.map((Item, index) => {
        if(index === position){
            return { ...Item, [field]: value };
        }

        return Item;
    });

    setItens(updatedItems);
  }

  const createAndDownloadPdf = (e) => {
    e.preventDefault();

    axios.post('/create-pdf', {
      nomeCliente,
      cpfCliente,
      desconto,
      itens,
      nomeEmpresa,
    })
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  return (
    <div className="row justify-content-center">
      <form onSubmit={createAndDownloadPdf}>


        <div className="row justify-content-center align-items-center">
          <h1>Formulário</h1>
        </div>

        <hr />

        <div className="form-group">
        <label for="nomeEmpresa">Nome da empresa</label>
          <input type="text" id="nomeEmpresa" className="form-control form-control-lg" placeholder="Nome da empresa" value={nomeEmpresa} onChange={(e) => { setNomeEmpresa(e.target.value) }} />
        </div>

        <div className="form-group">
        <label for="nomeCliente">Nome do cliente</label>
          <input type="text" id="nomeCliente" className="form-control form-control-lg" placeholder="Nome do cliente" value={nomeCliente} onChange={(e) => { setNomeCliente(e.target.value) }} />
        </div>

        <div className="form-group">
        <label for="cpfCliente">CPF do cliente</label>
          <input type="text" id="cpfCliente" className="form-control form-control-lg" placeholder="CPF do cliente" value={cpfCliente} onChange={(e) => { setCpfCliente(e.target.value) }} />
        </div>
        <div className="form-group">
        <label for="descontoAplicado">Desconto aplicado</label>
          <input type="number" id="descontoAplicado" className="form-control form-control-lg" placeholder="Desconto" value={desconto} onChange={(e) => { setDesconto(e.target.value) }} />
        </div>        

        <legend>            
                         <button type="button" className="btn btn-danger mb-1" onClick={addNewItem}>
            + Adicionar Item
                     </button>
        </legend>
        <div className="form-group">
        {itens.map((item,index) => {
          return(  
            <>          
          <input type="text" style={{marginBottom: '1rem'}} className="form-control form-control-lg" placeholder="Descrição do item" value={itens.desc} onChange={(e) => { setScheduleItemValue(index, 'desc', e.target.value) }} />          
          <input type="number" style={{marginBottom: '1rem'}} className="form-control form-control-lg" placeholder="Preço do item" value={itens.preco} onChange={(e) => { setScheduleItemValue(index, 'preco', e.target.value) }} />          
          <input type="number" style={{marginBottom: '1rem'}} className="form-control form-control-lg" placeholder="Quantidade" value={itens.qtd} onChange={(e) => { setScheduleItemValue(index, 'qtd', e.target.value) }} />          
          <br/>
          </>
          );
        })}
        </div>

        <button className="btn btn-primary mb-2" onClick={createAndDownloadPdf}>Download PDF</button>
      </form>
    </div>
  )
}

export default App;
