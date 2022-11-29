require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { redirect } = require("react-router-dom");
const { type } = require("os");
const user = require(__dirname + "/mongoDB/signUp");

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, function(){
    console.log("Server is listening on port: ", port);
});