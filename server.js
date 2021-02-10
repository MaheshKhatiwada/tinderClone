const express=require("express");
const mongoose=require("mongoose");
const Cards=require("./dbCards.js");
const Cors =require('cors');

//App config
const app=express();
const port=process.env.PORT||8001;
const connection_url=`mongodb+srv://admin:8RtyvWWB6hSnkgN@cluster0.x7i8k.mongodb.net/tinderdb?retryWrites=true&w=majority`

//Middlewares
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    
})



//Api Endpoints
app.get("/",(req,res)=>{
    res.status(200).send("Hello World");
})

app.post('/tinder/cards',(req,res)=>{
    const dbCard=req.body;

    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})
app.get('/tinder/cards',(req,res)=>{

    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})


//Listners
app.listen(port,()=>{
    console.log(`Listening on port :${port}`);
})