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
  var objetoAtivo = []
  exec().sync().then(async function(){
    const result = await define().findAll();
    
    result.forEach((e) => {
      if(!objetoAtivo.find((o) => {
        return o.hasOwnProperty(e['ativo'])
      })){
        objetoAtivo.push({[e['ativo']]:[e['quantidade'],e['preco']*e['quantidade']]})
      }else{
        objetoAtivo.find((o) => {
          if(o[e['ativo']]){
            console.log(o[e['ativo']][0], o[e['ativo']][0])
            o[e['ativo']][0] += e['quantidade']
            o[e['ativo']][1] += e['preco']*e['quantidade']
          }
        })
      }
    })
    res.send(objetoAtivo)
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