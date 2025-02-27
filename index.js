const express       = require('express')
const response      = require('../KKI/handleResponse')
const kki           = require('../KKI/getDatabyRRN')
const getData       = require('../KKI/getFlow2and3')
const kkiToken      = require('../KKI/getDatabyIssuerToken')

const app           = express()
const port = 6969
app.use(express.json());

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})

app.post('/get-reqres',async(req,res)=>{
  try{
    const {rrn} = req.body
    console.log(`HIT GET REQUEST AND RESPONSE`)
    const data = await getData(rrn)
    response(200,data,`Data Retrieved`,res)
  }
  catch(err){
    console.error('Error while updating :', err);
    response(500,err,"Internal Server Error", res);
  }
})

app.post('/get-log',async(req,res)=>{
  try{
    const {rrn} = req.body
    console.log(`HIT GET LOG`)
    const data = await kki(rrn)
    response(200,data,`Data Retrieved`,res)
  }
  catch(err){
    console.error('Error while updating :', err);
    response(500,err,"Internal Server Error", res);
  }
})
app.post('/get-log-issuerToken',async(req,res)=>{
  try{
    const {issuerToken} = req.body
    const data = await kkiToken(issuerToken)
    response(200,data,`Data Retrieved`,res)
  }
  catch(err){
    console.error('Error while updating :', err);
    response(500,err,"Internal Server Error", res);
  }
})