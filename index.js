const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors');
const ObjectId=require('mongodb').ObjectId;

const app=express()
const port=5000;


app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://testUser41:123qaz@cluster0.trepwvc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get('/',(req,res)=>{
  res.send("Running Curd Server")
})


async function run(){
 
  try{
      await client.connect();
      const database=client.db("FoodMaster")
      const usersCollection=database.collection('users')


      //Get Api

      app.get('/users',async(req,res)=>{
        const cursor=usersCollection.find({})
        const users=await cursor.toArray();
        res.send(users);
      })
     

      app.get('/users/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:Object(id)}
        const user=await usersCollection.findOne(query)
        console.log('Load user with id',id)
        res.send(user)
      })

      ///Post Api

      app.post('/users',async(req,res)=>{

                const newUser=req.body;
                const result=await usersCollection.insertOne(newUser)
                console.log("Hitting the post",req.body)
                console.log('added user',result)
                res.send(result)
      })

     // Delete API

     app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)}//this line inticat the delete item
      const result=await usersCollection.deleteOne(query)
      console.log("Deleting user with ID",result)
      res.send(result)
     })

      
  }

  finally{
   // await client.close()
  }

  }

  run().catch(console.dir)


 




app.listen(port,()=>{
   console.log("Running server on port",port)    
})