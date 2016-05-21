var express = require("express");

var app = express();
var PORT = process.env.PORT;

app.get("/",function(req,res){
    res.send("Todo API Root");
});



app.listen(PORT, process.env.IP,function(){
    console.log("Batman the server is serving");
    console.log("Express listening on port " + PORT + "!");
});