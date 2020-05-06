const express = require('express');
const app = express();
const cors = require('cors')
// const bodyParser = require('body-parser')

const router = require('./app/routes/operation.js')
const scraper = require('./scraper')

app.use(cors())
app.use(router)

// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.json({
    message: '/form.html'
  })
})

app.get('/search/:link', (req, res) => {
    scraper.search(req.params.link).then(price => {res.json(price)})
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Listening on ${port}`);
})