import React, {useState, useEffect} from 'react'
import OperationTable from './tables/OperationTable'
import RealTimeTable from './tables/RealTimeTable'
import AddOperationForm from './forms/AddOperationForm'
import Chart from './components/Chart'
import api from '../src/services/api'
import Routes from "./routes";
import axios from 'axios'

let keys = []
let time = 15000
let stp = {}


const operationsData = []
const operationsTotal = []
const currentPrices = []

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
      })
      .catch(error => console.log(error));
  }, []);
  useEffect(() => {
    fetch(
      `http://localhost:3000/operations/total`,
      {
        method: "GET",
      }
      )
      .then(res => res.json())
      .then(response => {
        response.forEach(r => {
          keys.push(Object.keys(r)[0])
        })
        setTotals(response);
      })
      .catch(error => console.log(error));
      setPrices([...prices, operations])
      setTimeout(()=> {loadTotal(keys)
      setTimeout(()=> {loadTotal(keys)
      setTimeout(()=> {loadTotal(keys)
      setTimeout(loadTotal(keys),500)},500)},500)},500)
      
      
      setInterval(()=>{
        loadTotal(keys)    
      },time)
    }, []);

  

  const [operations, setOperations] = useState(operationsData)
  const [totals, setTotals] = useState(operationsTotal)
  const [prices, setPrices] = useState(currentPrices)
  
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
    
  const loadTotal = (stocks) =>{
    stocks.forEach(stock =>{
      axios.get(`http://cotacao.b3.com.br/mds/api/v1/DailyFluctuationHistory/${stock}`).then(res => {
        if(res.data.TradgFlr.scty.lstQtn[res.data.TradgFlr.scty.lstQtn.length-1]){
          let price = res.data.TradgFlr.scty.lstQtn[res.data.TradgFlr.scty.lstQtn.length-1].closPric
          stp[stock] = price
        }
      })
    })
    setPrices([...prices, stp])
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
      <RealTimeTable totals={totals} prices={prices}/>
      <Chart loadCurrentOperations={loadCurrentOperations} prices={prices} totals={totals}/>
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