const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { redirect } = require("react-router-dom");
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

app.post("/signup", function(req, res){
    console.log("post");
    user.new(req.body).catch(console.dir);
    res.redirect("/dashboard");
});

app.post("/login", function(req, res){
    console.log("logging in")
    res.redirect("/dashboard");
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, function(){
    console.log("Server is listening on port: ", port);
});