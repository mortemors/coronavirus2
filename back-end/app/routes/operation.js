const express = require('express')
const router = express.Router();
const exec = require('../../src/database')
var Sequelize = require('sequelize');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

function define(){
  return exec().define('operations', {
    usuario: Sequelize.INTEGER,
    carteira: Sequelize.STRING,
    ativo: Sequelize.STRING,
    data: Sequelize.DATE,
    op: Sequelize.STRING,
    quantidade: Sequelize.FLOAT,
    preco: Sequelize.FLOAT,
    taxas: Sequelize.FLOAT,
    corretora: Sequelize.STRING,
    dd: Sequelize.FLOAT,
  })
}

router.post('/operation', (req,res)=>{
  // var {ativo, data, quantidade, preco, taxas, corretora, dd} = req.body
  exec().sync().then(async function(){
    let cadastrarOrdem = await define().create({
      usuario: req.body.usuario,
      carteira: req.body.carteira,
      ativo: req.body.ativo,
      data: req.body.data,
      op: req.body.op,
      quantidade: req.body.quantidade,
      preco: req.body.preco,
      taxas: req.body.taxas,
      corretora: req.body.corretora,
      dd: req.body.dd
    })
    console.log(req.body)
    res.send(cadastrarOrdem);
    
  });
})

router.get('/operations', (req,res)=>{
  exec().sync().then(async function(){
    const result = await define().findAll()
    .then((ordens) => {
      res.send(JSON.stringify(ordens, null, 4))
    })
      
  });
  
})

router.get('/operations/totais', (req,res)=>{
  var objetoAtivo = []
  exec().sync().then(async function(){
    const result = await define().findAll();
    
    result.forEach((e) => {
      if(!objetoAtivo.find((o) => {
        return o.hasOwnProperty(e['ativo'])
      })){
        objetoAtivo.push({[e['ativo']]:[[e['data'],e['quantidade'],e['preco']]]})
      }else{
        objetoAtivo.find((o) => {
          if(o[e['ativo']])
          o[e['ativo']].push([e['data'],e['quantidade'],e['preco']])

        })
        // objetoAtivo[0][e['ativo']].push([e['data'],e['quantidade'],e['preco']])
        // console.log(e['dataValues'])
        
      }
    })
    res.send(objetoAtivo)
  });
  
})
router.get('/operations/total', (req,res)=>{
  var activeOperation = []
  exec().sync().then(async function(){
    const result = await define().findAll();
    
    result.forEach((e) => {
      if(!activeOperation.find((o) => {
        return o.hasOwnProperty(e['ativo'])
      })){
        // console.log(activeOperation)
        activeOperation.push({[e['ativo']]:{'quantidade':e['quantidade'],'precoTotal':e['preco']*e['quantidade']}})
      } else {
        if(e['op'] === 'C'){
          activeOperation.find(o => o[e['ativo']])[e['ativo']]['quantidade'] += e['quantidade']
          activeOperation.find(o => o[e['ativo']])[e['ativo']]['precoTotal'] += e['preco']*e['quantidade']
        } else {
          activeOperation.find(o => o[e['ativo']])[e['ativo']]['quantidade'] -= e['quantidade']
          activeOperation.find(o => o[e['ativo']])[e['ativo']]['precoTotal'] -= e['preco']*e['quantidade']
        }
        // console.log(e['ativo'],e['data'], e['op'], e['preco'])
      }
      // if(activeOperation[e['ativo']]){
      //   if(e['op'] === 'C'){
      //     activeOperation[e['ativo']]['quantidade'] += e['quantidade']
      //     activeOperation[e['ativo']]['precoTotal'] += e['preco']*e['quantidade']
      //   }else if(e['op']){
      //     activeOperation[e['ativo']]['quantidade'] -= e['quantidade']
      //     activeOperation[e['ativo']]['precoTotal'] -= e['preco']*e['quantidade']
      //   }
      //   console.log('A',e['ativo'])
      // }else{
      //   activeOperation[e['ativo']] = {'quantidade':e['quantidade'], 'precoTotal':e['preco']*e['quantidade']}
      // }
    })
    res.send(activeOperation)
  });
  
})

router.post('/operation/update', (req,res)=>{
  exec().sync().then(async function(){
    await define().update({
      usuario: req.body.usuario,
      carteira: req.body.carteira,
      ativo: req.body.ativo,
      data: req.body.data,
      op: req.body.op,
      quantidade: req.body.quantidade,
      preco: req.body.preco,
      taxas: req.body.taxas,
      corretora: req.body.corretora,
      dd: req.body.dd
    }, {where: {
      id: req.body.id
    }})
    console.log(req.body)
    res.send('Updated')
  });
})

router.get('/operation/:id', (req,res)=>{
  exec().sync().then(async function(){
    await define().destroy({
      where:{
        id: req.params.id
      }
    })
    res.send('Deleted')
  });
})

module.exports = router