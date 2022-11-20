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
        const myDoc = await col.findOne();
        // Print to the console
        console.log(myDoc);
        alert("Sign up was succesful");
       } catch (err) {
        console.log(err.stack);
        alert("There was an error during sign up");
    }

    finally {
       await client.close();
   }
};
