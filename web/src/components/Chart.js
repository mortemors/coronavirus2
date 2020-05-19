import React, {Component} from 'react'
import { Doughnut } from "react-chartjs-2";

export default class Chart extends Component {
  constructor(props){
    let labels = ['1','2']
    let datas = [1,2]
    super(props)
    
    this.state = {
      data: {
        labels: labels,
        datasets: [
          {
            label: "Teste",
            backgroundColor: "rgba(255,0,255,0.75)",
            data:datas
          }
        ]
      }
    }
  }
  
  componentDidUpdate(){
    let labels = []
    let datas = []
    let colors = []

    Object.keys(this.props.totals).forEach(ativo => {
      let key = Object.keys(this.props.totals[ativo])
      console.log(this.props.prices[0][key])
      if(key[0] != undefined){
        labels.push(key[0])
        colors.push(`rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`)
        datas.push(this.props.totals[ativo][key]['quantidade']*this.props.prices[0][key])
      }
    })
    this.state.data.datasets[0].data = datas
    this.state.data.datasets[0].backgroundColor = colors
    this.state.data.labels = labels
  }
  render(){
    return (
      <div>
        <h3>Chart</h3>
        <Doughnut
          options={{}}
          data={this.state.data}
        />
      </div>
    )
  }
}
// import React, { Component } from 'react'
// import classes from "./LineGraph.module.css";
// import api from '../services/api'
// import axios from 'axios'

// let manageData = {
// }
// let manageData2 = {
// }
// let labels = []
// let datas = []
// let charts


// export default class LineGraph extends Component {
//   chartRef = React.createRef();
//   componentDidMount(){
//     charts = this.loadChart()
//   }
//   componentDidUpdate(){
//     this.loadData(this.props.prices)
//     this.updateConfigAsNewObject(charts)
//   }

// loadData(data){
//   labels = []
//   datas = []
//   Object.keys(data[0]).forEach(ativo => {
//     labels.push(ativo)
//     datas.push(data[0][ativo])
//   })
//   return 
// }
// updateConfigAsNewObject(chart) {
//   chart.options = {
//       responsive: true,
//       title: {
//           display: true,
//           text: 'Chart.js'
//       },
//       scales: {
//           xAxes: [{
//               display: true
//           }],
//           yAxes: [{
//               display: true
//           }]
//       }
//   };
//   chart.update();
// }


// // async loadPrices(stocks){
// //     let i = 0
// //     let price
// //     let prices = []
// //     while(i<stocks.length){
// //       await axios.get(`http://cotacao.b3.com.br/mds/api/v1/DailyFluctuationHistory/${stocks[i]}`).then(res => {
// //         if(res.data.TradgFlr.scty.lstQtn[res.data.TradgFlr.scty.lstQtn.length-1]){
// //           price = res.data.TradgFlr.scty.lstQtn[res.data.TradgFlr.scty.lstQtn.length-1].closPric
// //           prices.push(price)
// //         }
// //       })
// //       i++
// //     }
// //     i=0
//     // console.log('a')
//     // let prices = this.loadPrices(stocks)
//   //   return prices
//   // }

//   // async loadPrices(stocks){
//   //   let i = 0
//   //   let prices = []
//   //   while(i<stocks.length){
//   //     await axios.get(`http://localhost:3000/search/${stocks[i]}`).then(res => {
//   //       prices.push(res.data)
//   //       // console.log(res.data, typeof res.data);
//   //     })
//   //     i++
//   //   }
//   //   i=0
//   //   return prices
//   // }

//   async loadChart(){
//     // let datas = []
//     let colors = []
//     // let prices = []
    

//     // await axios.get('http://localhost:3000/operations/total').then(res => {
//     //   console.log(res.data)

//     //   // for(var i = 0; i < res.data.length; i++){
//     //   //   var fixedData
//     //   //   var ativo
//     //   //   //se existe a ação usa a mesma cor, se não gera uma cor aleatoria
//     //   //   ativo = Object.keys(res.data[i])[0]
//     //   //   if(manageData[ativo]){
//     //   //     fixedData = parseFloat(res.data[i][ativo][1]).toFixed(2)
//     //   //     manageData[ativo] = [ fixedData, manageData[ativo][1]]
//     //   //     manageData2[ativo] = [ fixedData, manageData2[ativo][1],res.data[i][ativo][0]]
//     //   //   }else{
//     //   //     fixedData = parseFloat(res.data[i][ativo][1]).toFixed(2)
//     //   //     manageData[ativo] = [fixedData,`rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.6)`, res.data[i][ativo][0]]
//     //   //     manageData2[ativo] = manageData[ativo]

//     //   //   }
//     //   // }
//     // })
//     //     let keysSorted = Object.keys(manageData).sort(function(a,b) {
//     //       return(manageData[b][0] - manageData[a][0])})
//     //       prices = await this.loadPrices(keysSorted)
//     //       for(let i = 0; i< prices.length;i++){
//     //         prices[i] = parseFloat(prices[i] * manageData2[keysSorted[i]][2]).toFixed(2)
//     //         // console.log(prices[i])
//     //       }

//     //       keysSorted.forEach((e)=>{
//     //         datas.push(manageData[e][0])
//     //         colors.push(manageData[e][1])
//     //       })

          
//         // let keysSorted2 = Object.keys(manageData2).sort(function(a,b) {
//         //   return(manageData2[b][0] - manageData2[a][0])})
//         //   keysSorted2.forEach((e)=>{
//         //     datas2.push(manageData2[e][0])
//             // colors.push(manageData2[e][1])
//         //   })
          
//           // console.log(Object.keys(res.data[0])[0])
//           // console.log(manageData['BRAP4'])
          
          
//           let val = this.props.prices
//           console.log(val)
          
//           const myChartRef = this.chartRef.current.getContext("2d");
//           console.log(labels, datas)
//           new Chart(myChartRef, {
//             type: "doughnut",
//             data: {
//               labels: labels,
//               datasets:[{
//                 label: 'Valor de Mercado',
//                 data: datas,
//                 backgroundColor: colors
//               }
//               // {
//               //   label: 'Valor de Compra',
//               //   data: datas,
//               //   backgroundColor: colors
//               // }
//             ]
//           },
//           options:{
//             legend:{
//               // position: 'right',
//               // display: false
//             }
//           }
//         })
        
//       }
//       render() {
//         return (
//           <div className={classes.graphContainer}>
//           <canvas
//           id="myChart"
//           ref={this.chartRef}
//           />
//           </div>
//           )
//         }
//       }