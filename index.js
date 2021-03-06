
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
       const itemCollection = database.collection('item_product');

       const menudatabase = client.db('menuItems');
       const menudata = menudatabase.collection('menu')
       const items = menudatabase.collection('items')


       app.post('/items',async (req, res)=>{
           
       })
      //  menus get 
      app.get('/menu',async (req,res)=>{
        const cuusor = items.find({})
        const men = await cuusor.toArray()
        res.json(men)
      })
       //menus ites  post
       app.post('/menu', async(req, res) =>{
    
        const name = req.body.name;
        const itemId = req.body.itemId;
        const id = req.body.id;
        const price = req.body.price;
        const ratings = req.body.ratings;

        const imgSrc = req.files.imgSrc;
        const picData = imgSrc.data;

        const encodedPic = picData.toString('base64');
        const imgeBuffer = Buffer.from(encodedPic,'base64')

        const menu ={
          name,
          itemId,
          id,
          ratings,
          price,
          imgSrc: imgeBuffer
        }
        const result = await  items.insertOne(menu)
         res.json(result)

       })



       //menu ites server to clict
       app.get('/menuItem',async (req,res)=>{
         const cuusor = menudata.find({})
         const menus = await cuusor.toArray()
         res.json(menus)
       })
        // Menu item clint to server
       app.post('/menuItem', async(req, res) =>{
    
        const name = req.body.name;
        const itemId = req.body.itemId;
        const id = req.body.id;
        const imgSrc = req.files.imgSrc;
        const picData = imgSrc.data;

        const encodedPic = picData.toString('base64');
        const imgeBuffer = Buffer.from(encodedPic,'base64')

        const menu ={
          name,
          itemId,
          id,
          imgSrc: imgeBuffer
        }
        const result = await  menudata.insertOne(menu)
         res.json(result)

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