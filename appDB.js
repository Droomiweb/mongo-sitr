const { MongoClient } = require('mongodb')

const uri = 'mongodb+srv://Abi:abiabi@study.9o2iioz.mongodb.net/'

const client = new MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true})

async function connect(){
  try{
    await client.connect();
    console.log("db connected")

    //operations goes here

  } catch(err){
    console.error('error connectiong to db'+err)
  } finally{
    await client.close();
  }
}

connect()