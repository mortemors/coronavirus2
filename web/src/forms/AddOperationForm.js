import React, { useState } from 'react'

const AddOperationForm = props => {
  const initialFormState = {
    id: null, 
    usuario:'', 
    carteira:'', 
    ativo: '', 
    data: '',
    op: '',
    quantidade:'',
    preco: '', 
    taxas: '',
    corretora: '',
    dd: ''}
  const [operation, setOperation] = useState(initialFormState)

  const handleInputChange = event => {
    const {name, value} = event.target

    setOperation({...operation, [name]: value})
  }

  return (
    <form
    class="form-inline"
      onSubmit={event => {
        event.preventDefault()
        if (!operation.ativo || !operation.preco) return
        props.addOperation(operation)
        setOperation(initialFormState)
      }}
      >
      <div>
        <div className="col-25">
          <label>Usuário</label>
        </div>
        <div className="col-75">
          <input type="text" name="usuario" value={operation.usuario} onChange={handleInputChange} />
        </div>
      </div>
      <div>
        <div className="col-25">
          <label>Carteira</label>
        </div>
        <div className="col-75">
          <input type="text" name="carteira" value={operation.carteira} onChange={handleInputChange} />
        </div>
      </div>
      <div>
      <div className="col-25">
        <label>Ativo</label>
      </div>
      <div className="col-75">
        <input type="text" name="ativo" value={operation.ativo} onChange={handleInputChange} />
      </div>
      </div>
      <div>
      <div className="col-25">
        <label>Data</label>
      </div>
      <div className="col-75">
        <input type="text" name="data" value={operation.data} onChange={handleInputChange} />
      </div>
      </div>
        <div>
      <div className="col-25">
      <label>C/V</label>
      </div>
      <div className="col-75">
      <input type="text" name="op" value={operation.op} onChange={handleInputChange} />
      </div>
      </div>
        <div>
      <div className="col-25">
      <label>Quantidade</label>
      </div>
      <div className="col-75">
      <input type="text" name="quantidade" value={operation.quantidade} onChange={handleInputChange} />
      </div>
      </div>
        <div>
      <div className="col-25">
      <label>Valor</label>
      </div>
      <div className="col-75">
      <input type="text" name="preco" value={operation.preco} onChange={handleInputChange} />
      </div>
      </div>
        <div>
      <div className="col-25">
      <label>Taxas</label>
      </div>
      <div className="col-75">
      <input type="text" name="taxas" value={operation.taxas} onChange={handleInputChange} />
      </div>
      </div>
        <div>
      <div className="col-25">
      <label>Corretora</label>
      </div>
      <div className="col-75">
      <input type="text" name="corretora" value={operation.corretora} onChange={handleInputChange} />
      </div>
      </div>
        <div>
      <div className="col-25">
      <label>DD</label>
      </div>
      <div className="col-75">
      <input type="text" name="dd" value={operation.dd} onChange={handleInputChange} />
      </div>
      </div>
      <button>Adicionar nova operação</button>
    </form>
  )
}

export default AddOperationForm