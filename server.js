var express = require("express");

var app = express();
var PORT = process.env.PORT;
var todos = [
        {
            id: 1,
            description:"Meet mom for lunch",
            completed: false
        },
        
        {
            id:2,
            description:"Go to the market",
            completed: false
        },
        
        {
            id:3,
            description:"Feed the cat",
            completed:true
        }
    ];

app.get("/",function(req,res){
    res.send("Todo API Root");
});

//GET /todos
app.get("/todos",function(req,res){
    res.json(todos);
});

//GET /todos/:id
app.get("/todos/:id",function(req,res){
    var todoId = parseInt(req.params.id,10);
    var matchedTodo;
    //Iterate of todos array. Find the match.
    todos.forEach(function(todo){
        if(todoId ===todo.id){
            matchedTodo = todo;
            
        }
    });
    if(matchedTodo){
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }
    //res.status(404).send();
    //res.send("Asking for todo with id of " + req.params.id); 
    });
   








app.listen(PORT, process.env.IP,function(){
    console.log("Batman the server is serving");
    console.log("Express listening on port " + PORT + "!");
});