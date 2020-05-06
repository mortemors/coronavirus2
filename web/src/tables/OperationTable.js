import React from 'react'

import EditOpertationForm from '../forms/EditOperationForm'

const OperationTable = props => (
  <table>
    <thead>
      <tr>
        <th>Usuario</th>
        <th>Carteira</th>
        <th>Ativo</th>
        <th>Data</th>
        <th>Comp. ou Ven.</th>
        <th>Quantidade</th>
        <th>Valor</th>
        <th>Taxas</th>
        <th>Corretora</th>
        <th>Dedo Duro</th>
        <th>Total</th>
        <th>Alterações</th>
      </tr>
    </thead>
    <tbody>
      {props.operations.length >0 ? (
        props.operations.map(
          operation => (
            operation.id === props.currentOperation.id && props.editing ? (
              
              <EditOpertationForm
              setEditing={props.setEditing}
              currentOperation={props.currentOperation}
              updateOperation={props.updateOperation}
              />
              
      //       <tr key={operation.id}>
      //         <td><input type="text" name="usuario" value={operation.usuario}/></td>
      //         <td><input type="text" name="carteira" value={operation.carteira}/></td>
      //         <td><input type="text" name="ativo" value={operation.ativo} /></td>
      //         <td><input type="text" name="data" value={operation.data}  /></td>
      //         <td><input type="text" name="op" value={operation.op}  /></td>
      //         <td><input type="text" name="quantidade" value={operation.quantidade}  /></td>
      //         <td><input type="text" name="preco" value={operation.preco}  /></td>
      //         <td><input type="text" name="taxas" value={operation.taxas}  /></td>
      //         <td><input type="text" name="corretora" value={operation.corretora}  /></td>
      //         <td><input type="text" name="dd" value={operation.dd}/></td>
      //         <td><td>{(operation.quantidade * operation.preco).toFixed(2)}</td></td>

      //         <button onClick={
      //           event => { event.preventDefault()
      //           props.updateOperation(operation.id, operation)
      //           }}>Aualizar</button>
      // <button onClick={() => props.setEditing(false)} className="button muted-button">
      //   Cancelar
      // </button>
      //       </tr>
            ) :(
            <tr key={operation.id}>
              <td>{operation.usuario}</td>
              <td>{operation.carteira}</td>
              <td>{operation.ativo}</td>
              <td>{operation.data}</td>
              <td>{operation.op}</td>
              <td>{operation.quantidade}</td>
              <td>{operation.preco}</td>
              <td>{operation.taxas}</td>
              <td>{operation.corretora}</td>
              <td>{operation.dd}</td>
              <td>{(operation.quantidade * operation.preco).toFixed(2)}</td>
              <td>
                <button onClick={() => { props.editRow(operation) }} className="button muted-button">Editar</button>
                
                <button onClick={()=> props.deleteOperation(operation.id)} className="button muted-button">Deletar</button>
                
              </td>
            </tr>
            )
        ))
      ): (
        <tr>
          <td colSpan={3}>Sem operações</td>
        </tr>
      )
      }
    </tbody>
  </table>
)

export default OperationTable