
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const fileUpload = require('express-fileupload')
const port = process.env.PORT ||5000;
//midelware
app.use(cors())
app.use(express.json())
app.use(fileUpload())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.abylu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       await client.connect();
       console.log('database connected successfully')
       const database = client.db('online_shop');
       const menudatabase = client.db('menuItem');

       const itemCollection = database.collection('item_product');
       app.post('/items',async (req, res)=>{
           
       })

       app.post('/menuItem', async(req, res) =>{
    
         console.log('body', req.body)
         console.log('files',req.files)
         res.json({success: true})

       })
    }
    finally{

         //await client.close()
    }

}
run().catch(console.dir)

console.log(uri)
app.get('/', (req, res) => {
  res.send('Hello Online Shop!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})