const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rocco:Jg72518N@linezcluster.7xmmlod.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = "Linez";
                      
async function run(props) {
   try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection("users");
        // Construct a document 
        let personDocument = {
            "name": { "first": props.fName, "last": props.sName },
            "email": props.email,
            "birth": new Date(props.year, props.month, props.day),
            "profession": props.profession,
            "projects": []
            }
        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(personDocument);
        // Find one document
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);
       } catch (err) {
        console.log(err.stack);
    }

    finally {
       await client.close();
   }
}
run().catch(console.dir);