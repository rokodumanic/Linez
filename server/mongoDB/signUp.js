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
            "password": props.userHash,
            "projects": []
            }

        const check = 0;/*  await checkExistingUser(col, props.email); */
        console.log("Check:",check);
        if(check == 0){
            // Insert a single document, wait for promise so we can read it back
            const p = await col.insertOne(personDocument);
            // Find one document
            const myDoc = await col.findOne({email: props.email});
            // Print to the console
            console.log("New user!:",myDoc);
        } else if(check == 1){
            console.log("User already exists!");
        } else {console.log("Error in checkExistingUser")}
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
         // Use the collection "users"
         const col = db.collection("users");
         console.log(props);
        
         const hash = await getHash(col, props);
         const salt = hash.slice(0, 29);
         // Return clean hash value as string
         console.log("returning hash", hash);
         console.log("returning salt", salt);
         return [hash, salt];
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
            rects: props.rect,
            date: props.date
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
         let projectCards = [];
         console.log("Props: ", props);
         // Find one document
         await colUser.findOne({email:props}, {projection: {_id:0, projects:1}})
            .then(result => {console.log("Result: ", result);
                    project = result;})
            .catch(err => console.log("Err: ", err));
        let getProjectList = colPro.find({_id : {$in : project.projects}}, {projection: {_id:1, title:1, date:1}});
        console.log("Result2: ", getProjectList);
        await getProjectList.forEach((result) => {
            console.log(result);
            projectCards.push(result); 
        });
        console.log("Project Cards:",projectCards);
         return projectCards;
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
            rects: props.rect,
            date: props.date}});
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

module.exports.getSalt = async function (props) {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("users");
         // Construct a document 
         console.log(props);
         // Find one document
        const hash = await getHash(col, props);
         // Extract the hash vlue
        const salt = hash.slice(7, 29);
         // Return clean hash value as string
         console.log("returning salt", salt);
         return salt;
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
 };

async function checkExistingUser(col, email){
    try{
        const myDoc = await col.findOne({email: email});
        console.log("found:", myDoc);
        if (myDoc == null){
            return 0;
        } else if(myDoc != null){
            return 1;
        }
    } catch(err){
        console.log(err);
    }
 }

async function getHash(col, props){
    const hashObj = JSON.stringify(await col.findOne({email: props}, {projection: {_id:0, password:1}})); 
         // Extract the hash vlue
         console.log("hashObj:", hashObj);
         const hash = hashObj.slice(hashObj.indexOf("$"), -2);
    return hash;
}