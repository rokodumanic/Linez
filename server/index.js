require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const user = require(__dirname + "/mongoDB/signUp");

const port = 5000;
const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", function(req, res){
    console.log("vnsdnosn");
});

app.post("/", function(req, res){
    console.log("/postjsvfjv");
});

app.post("/signup", async function(req, res){
    console.log("post");
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        // Store hash in your password DB.
        req.body.password = hash;
    });
    console.log("11111111111111111111111111");
    await user.new(req.body).catch(console.dir);
    console.log("222222222222222222222222");
    res.redirect("/dashboard");
    
});

app.post("/login", async function(req, res){
    console.log("logging in");
    const hash = await user.logIn(req.body.email);

    const password = req.body.password;
    console.log("HASH: ", hash);
    console.log("PASSWORD: ", password);
    console.log("PASSTYPE:", typeof password, "HASHTYPE:", typeof hash);
    bcrypt.compare(password, hash, (err, result) => {
        if(err){
            console.log(err);
        } else if (result == true){
            console.log("krajnji result", result);
            res.redirect("/dashboard");
        } else if(result == false){
            console.log("krajnji result", result);
            res.redirect("/login");
        }
    });
    
});

app.post("/dashboard", async function(req, res){
    const projects = await user.getProjects("dumanicroko@gmail.com");
    console.log("PROJECTS:", projects);
    res.send(projects);
});

app.post("/workspace", async function(req, res){
    console.log(req.body);
    if(req.body.projectId==false){
        await user.saveProject(req.body)
            .then(result => res.status(201).send('saved'))
            .catch(err => console.log("save failed:", err));
    } else if(typeof req.body.projectId == "string"){
        await user.updateProject(req.body)
            .then(result => res.status(201).send('updated'))
            .catch(err => console.log("update failed:", err));
    }
});

app.post("/loadProject", async function(req, res){
    try{
        console.log("Usao u /loadProject", req.body.project);
        const project = await user.loadProject(req.body.project)
        console.log("result koji saljemo Reactu", project);
        res.status(201).send(project);
        }
    catch(err) {console.log(err)};
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, function(){
    console.log("Server is listening on port: ", port);
});