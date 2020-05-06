const fetch = require('node-fetch')
const cheerio = require('cheerio')

let url = 'https://finance.yahoo.com/quote/'

function search(sigla){
  // var reg = /\w{4}/
  // sigla = sigla.match(reg)[0]
  
  if(sigla=='BTCUSD'){
    urlComplete = url + 'BTC-USD'
  }else{
    urlComplete = url + sigla + '.SA'
  }
  return fetch(`${urlComplete}`)
  .then(response => response.text())
  .then(body =>{
    const $ = cheerio.load(body);
    var quote_header_info = $('div[id=quote-header-info]').children().eq(2).find('span').html()
    // var texto = $('span[class*=Fw]').first().text()
    // reg =/\,/g
    // texto = texto.replace(reg,'')
    // texto = parseFloat(texto)
    reg =/\,/g
    quote_header_info = quote_header_info.replace(reg,'')
    quote_header_info = parseFloat(quote_header_info)
    console.log(quote_header_info)
    // return JSON.parse(texto)
    return quote_header_info
  })

}


module.exports = {
  search,
};

