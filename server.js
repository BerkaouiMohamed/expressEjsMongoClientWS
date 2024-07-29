const express = require("express");

const path = require("path");

const router=require('./router/routes')



const app = express();

app.use((req,res,next)=>{
    console.log(req.method,req.ip)
    next()
})
app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));

app.use("/",router)


PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server running on port 5000"));
 