const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id : uuidv4(),
        username : "shradhakhapra",
        caption : "I love coding",
        image : "https://pbs.twimg.com/media/Fo2uHQwaAAY07Nr?format=jpg&name=large",
        like : 25000,
        comment : 150
    },
    {
        id : uuidv4(),
        username : "Priyanksharmaa",
        caption : "Live Love Dance",
        image : "https://data1.ibtimes.co.in/en/full/744895/priyank-sharma.jpg",
        like : 121000,
        comment : 1500
        
    },
    {
        id : uuidv4(),
        username : "Priyank",
        caption : "I love Hills!!!",
        image : "https://assets.cntraveller.in/photos/612f97214eaffd3ac697992a/4:3/w_4032,h_3024,c_limit/LICENSE_Karma%20Dorji_(c)%20Getty_Thimphu%20Bhutan_CNT%20UK_Karin_GettyImages-1285422736.jpg",
        like : 78550,
        comment : 1550  
    },

];



app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let newCaption = req.body.caption;
    let post = posts.find((p)=> id === p.id);
    post.caption = newCaption;
    res.redirect("/posts");
});

app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let {username , caption , image} = req.body;
    let id = uuidv4();
    posts.push({id, username, caption, image});
    res.redirect("/posts");
});

app.get("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

app.delete("/posts/:id",(req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");  
});

app.get("/posts/write", (req, res)=>{
    res.render("write.ejs");
});

app.listen(port, ()=>{
    console.log("Listening on port 8080");
});

