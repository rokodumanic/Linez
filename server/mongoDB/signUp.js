const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
 
 module.exports.saveProject = async function (props) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col1 = db.collection("projects");
         const col2 = db.collection("users");
         // Construct a document 
         console.log(props);
         let project = {
            title: props.title,
            lines: props.line, 
            ellipses: props.ellipse,
            rects: props.rect
            };
        // Insert a single document, wait for promise so we can read it back
        let tempId="";
        await col1.insertOne(project)            
            .then(result => {
                console.log(`Successfully inserted item with _id: ${result.insertedId}`);
                tempId = result.insertedId;})
            .catch(err => console.error(`Failed to insert item: ${err}`));
        await col2.updateOne(
            {email: "dumanicroko@gmail.com"},
            {$addToSet: {projects: tempId}}
        ).then( result => console.log(result))
        .catch(err => console.log(err));
        return true;
        } catch (err) {
         console.log(err.stack);
         return err;
     }
 
     finally {
        await client.close();
    }
 };
 
module.exports.getProjects = async function (props) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const colUser = db.collection("users");
         const colPro = db.collection("projects");
         // Construct a document 
         let project = [];
         console.log("Props: ", props);
         // Find one document
         await colUser.findOne({email:props}, {projection: {_id:0, projects:1}})
            .then(result => {console.log("Result: ", result);
                    project = result;})
            .catch(err => console.log("Err: ", err));
         return project;
         // Return clean hash value as string
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();

    }
 };

module.exports.loadProject = async function (props) {
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection("projects");
        const projectId = new ObjectId(props)
        console.log("loadProject module:", props);
        const project = await col.findOne({_id: projectId}, {projection: {title: true,
            lines: true, 
            ellipses: true,
            rects: true}});
        console.log("Loading:", project);
        return project;
        
    }

    catch(err) {
        err => console.log(err)
    }

    finally{
        await client.close();
    }
};

module.exports.updateProject = async function (props) {
    try{
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        // Use the collection "people"
        const col = db.collection("projects");
        const projectId = new ObjectId(props.projectId);
        console.log("updateProject module:", props);
        const project = await col.updateOne({_id: projectId}, {$set: {
            title: props.title,
            lines: props.line, 
            ellipses: props.ellipse,
            rects: props.rect}});
        console.log("Updating:", project);
        return project;
        
    }

    catch(err) {
        err => console.log(err)
    }

    finally{
        await client.close();
    }
};

 