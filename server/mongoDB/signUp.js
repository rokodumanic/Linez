const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rocco:Jg72518N@linezcluster.7xmmlod.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = "Linez";
                      

module.exports.new = async function (props) {
   try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection("users");
        // Construct a document 
        console.log(props);
        let personDocument = {
            "name": { "first": props.fName, "last": props.lName },
            "email": props.email,
            "password": props.password,
            "projects": []
            }
        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(personDocument);
        // Find one document
        const myDoc = await col.findOne({email: props.email});
        // Print to the console
        console.log(myDoc);
       } catch (err) {
        console.log(err.stack);
    }

    finally {
       await client.close();
   }
};


module.exports.logIn = async function (props) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("users");
         // Construct a document 
         console.log(props);
         // Find one document
         const hashObj = JSON.stringify(await col.findOne({email: props}, {projection: {_id:0, password:1}})); 
         // Extract the hash vlue
         const hash = hashObj.slice(hashObj.indexOf("$"), -2);
         // Return clean hash value as string
         return hash;
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
 };
 

 