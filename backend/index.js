const express=require('express');
const bodyParser=require('body-parser')
const DBConnect=require("./db");
const mongoose=require('mongoose')
const cors=require('cors')



const app=express();
const Port=5000;
DBConnect();



app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/',async(req,res)=>{
    
    
});
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/displayData"));
app.use("/api", require("./routes/OrderData"));
app.use("/api", require("./routes/MyOrder"));
app.listen(Port,()=>{
    console.log(`Our Port is connected at ${Port}`);
});