const {MongoClient} = require('mongodb')

const uri = 'mongodb+srv://Abi:abiabi@study.9o2iioz.mongodb.net/'

const dbname = 'test'

const client = new MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true})

async function insert(){
    try{
        await client.connect()
        console.log("Connected To The DB")

        const db = client.db(dbname)

        const collection = db.collection('post')
        
        const Data = ({
            name:"anjali",
            age:18,
            state:"karnataka"
        })

        const result = await collection.insertOne(Data);
        console.log("Inserted Successfully"+result.ops)
    } catch(err){
        console.log(err)
    } finally{
        client.close()
    }
}

insert()