import React, {useState, useEffect} from 'react'
import OperationTable from './tables/OperationTable'
import AddOperationForm from './forms/AddOperationForm'
import Chart from './components/Chart'
// import api from '../src/services/api'

const operationsData = []

const App = () => {
  useEffect(() => {
    fetch(
      `http://localhost:3000/operations`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response => {
        setOperations(response);
        // console.log(response);
      })
      .catch(error => console.log(error));
  }, []);

  

  const [operations, setOperations] = useState(operationsData)

  const [editing, setEditing] = useState(false)
  const initialFormState = {id: null, usuario:'', carteira:'', ativo: '', preco: '', quantidade:''}
  const [currentOperation, setCurrentOperation] = useState(initialFormState)

  const editRow = operation => {
    setEditing(true)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: operation.id, 
        usuario: operation.usuario,
        carteira: operation.carteira,
        ativo: operation.ativo,
        data: operation.data,
        op: operation.op,
        quantidade: operation.quantidade,
        preco: operation.preco,
        taxas: operation.taxas,
        corretora: operation.corretora,
        dd: operation.dd,
      })
    };
    fetch(
      `http://localhost:3000/operation/update`, requestOptions
      )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    setCurrentOperation({
      id: operation.id, 
      usuario: operation.usuario,
      carteira: operation.carteira,
      ativo: operation.ativo,
      data: operation.data,
      op: operation.op,
      quantidade: operation.quantidade,
      preco: operation.preco,
      taxas: operation.taxas,
      corretora: operation.corretora,
      dd: operation.dd,
    })
  }


  const addOperation = operation => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        usuario: operation.usuario,
        carteira: operation.carteira,
        ativo: operation.ativo,
        data: operation.data,
        op: operation.op,
        quantidade: operation.quantidade,
        preco: operation.preco,
        taxas: operation.taxas,
        corretora: operation.corretora,
        dd: operation.dd,
      })
    };
    fetch(
      `http://localhost:3000/operation`, requestOptions
      )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
    setOperations([...operations, operation])
  }

  const loadCurrentOperations = operation => {
    fetch(
      `http://localhost:3000/operations/total`,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response => {
        return response;
      })
      .catch(error => console.log(error));
  }

  const deleteOperation = id => {
    fetch(
      `http://localhost:3000/operation/${id}`,
      {
        method: "GET",
      }
      )
    setOperations(operations.filter(operation => operation.id !== id))
  }

  
  const updateOperation = (id, updatedOperation) => {
    setEditing(false)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id, 
        usuario: updatedOperation.usuario,
        carteira: updatedOperation.carteira,
        ativo: updatedOperation.ativo,
        data: updatedOperation.data,
        op: updatedOperation.op,
        quantidade: updatedOperation.quantidade,
        preco: updatedOperation.preco,
        taxas: updatedOperation.taxas,
        corretora: updatedOperation.corretora,
        dd: updatedOperation.dd,
      })
    };
    fetch(
      `http://localhost:3000/operation/update`, requestOptions
      )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    setOperations(operations.map(operation => (operation.id === id ? updatedOperation : operation)))
  }

  
  return (
    
    <div>
      <h1>Investimentos</h1>
      <Chart loadCurrentOperations={loadCurrentOperations}/>
        <div className="flex-large">
          <div>
            <h2>Adicionar operação</h2>
            <AddOperationForm addOperation={addOperation} />
          </div>
        </div>  
      <div className="flex-row">
        <div className="flex-large">
          <h2>Ver operações</h2>
          <OperationTable editing={editing} operations={operations} editRow={editRow} deleteOperation={deleteOperation} currentOperation={currentOperation} updateOperation={updateOperation} setEditing={setEditing} loadCurrentOperations={loadCurrentOperations}
          />
        </div>
      </div>
    </div>
  )
}

export default App