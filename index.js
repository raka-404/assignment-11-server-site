const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express()
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yyhkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const run = async()=>{
    try{
        await client.connect();
        const database = client.db("megaTour");
        const touristCollection = database.collection("tourist");
        const userCollection = database.collection("user");


        // get api
        app.get('/card',async(req,res)=>{
            const cursor = touristCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })
        // get post
        app.post('/card',async(req,res)=>{
            const newEvent = req.body
            const result = await touristCollection.insertOne(newEvent)
            res.json(result)
        })
        //get post
        app.post('/users',async(req,res)=>{
            const newEvent = req.body
            const result = await userCollection.insertOne(newEvent)
            res.json(result)
        })

        app.get('/users',async(req,res)=>{
            const cursor = userCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete('/users/:id',async(req,res)=>{
            const id = req.params.id
            const cursor = {_id : ObjectId(id)}
            const result = await userCollection.deleteOne(cursor)
            res.json(result)
        })

    }
    finally{
        // client.close()
    }
}

run().catch(console.dir)


app.get('/',(req,res)=> {
    res.send('Running the server megaTour')
})

app.listen(port,()=>{
    console.log('port in running on',port)
})
