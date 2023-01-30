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
    console.log("11111111111111111111111111");
    await user.new(req.body.user).catch(console.dir);
    console.log("222222222222222222222222");
    res.redirect("/dashboard");
    
});

app.post("/login", async function(req, res){
    console.log("logging in:", req.body);
    const [hash, salt] = await user.logIn(req.body.email);
    console.log("accepted hash from server", hash);
    console.log("accepted salt from server", salt);

    if(req.body.hash === hash){
        res.redirect("/dashboard");
    }else if(req.body.hash != hash){
        res.redirect("/login");
    } else{console.log("Log in failed!!!")}
});

app.post("/getsalt", async function(req, res){
    console.log("get salt");
    const salt = await user.getSalt(req.body.email);
    console.log("got Salt", salt);
    res.send(salt);
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