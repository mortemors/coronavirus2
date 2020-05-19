import React from 'react'

const RealTimeTable = props => (
  
          <table style={{width:"100px", align:"center"}}>
              <thead>
                <tr>
                  <th>Ativo</th>
                  <th>Quantidade</th>
                  <th>Total Investido</th>
                  <th>Valor de Mercado</th>
                </tr>
              </thead>
              <tbody>
      {props.totals.length >0 ? (
        
        props.totals.map(
          operation => (
            <tr key={operation.id}>
              <td style={{textAlign:"center", color:"red"}}>{Object.keys(operation)[0]}</td>
              <td style={{textAlign:"center"}}>{(operation[Object.keys(operation)[0]].quantidade)}</td>
              <td style={{textAlign:"center"}}>{(parseFloat(operation[Object.keys(operation)[0]].precoTotal).toFixed(2))}</td>
              <td style={{textAlign:"center"}}>{(props.prices[0][Object.keys(operation)[0]]*operation[Object.keys(operation)[0]].quantidade).toFixed(2)}</td>
            </tr>
          )
        )
  ):(
        
        <tr>
          <td colSpan={3}>Sem operações</td>
        </tr>
      )
      
    }
      </tbody>
      </table>
      
)
export default RealTimeTable
