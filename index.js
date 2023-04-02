const express=require("express");
const cors=require("cors");
const stripe=require("./routes/stripe")

const app=express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/stripe",stripe)


app.get("/",(req,res)=>{
 res.send("welcome")
});

app.listen(4500,()=>{
 console.log("server started wuhuhuhuhu")
})