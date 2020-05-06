import React, { useState } from 'react'

const EditOperationForm = props => {
  const [operation, setOperation] = useState(props.currentOperation)

  const handleInputChange = event => {
    const { name, value } = event.target

    setOperation({ ...operation, [name]: value })
  }

  return (
    <tr key={operation.id}>
      <td><input type="text" name="usuario" value={operation.usuario}onChange={handleInputChange}/></td>
      <td><input type="text" name="carteira" value={operation.carteira}onChange={handleInputChange}/></td>
      <td><input type="text" name="ativo" value={operation.ativo} onChange={handleInputChange}/></td>
      <td><input type="text" name="data" value={operation.data}  onChange={handleInputChange}/></td>
      <td><input type="text" name="op" value={operation.op}  onChange={handleInputChange}/></td>
      <td><input type="text" name="quantidade" value={operation.quantidade}  onChange={handleInputChange}/></td>
      <td><input type="text" name="preco" value={operation.preco}  onChange={handleInputChange}/></td>
      <td><input type="text" name="taxas" value={operation.taxas}  onChange={handleInputChange}/></td>
      <td><input type="text" name="corretora" value={operation.corretora}  onChange={handleInputChange}/></td>
      <td><input type="text" name="dd" value={operation.dd}onChange={handleInputChange}/></td>
      <td><td>{(operation.quantidade * operation.preco).toFixed(2)}</td></td>

      <button onClick={
        event => { event.preventDefault()
        props.updateOperation(operation.id, operation)
        }}>Aualizar</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancelar
      </button>
      </tr>
      
  )
}

export default EditOperationForm