var express = require("express");

var app = express();
var PORT = process.env.PORT;
var bodyParser = require("body-parser");

var todos = [];
var todoNextId =1;

app.use(bodyParser.json());

//ROUTES
//////////////////////////////////////////////////////////////////////////////////////


//Root route
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
   



//POST request /todos
app.post("/todos",function(req,res){
    var body = req.body;
    //add id field
    body.id = todoNextId++;
    //push body into array
    // todos.push(body.description);
    // todos.push(body.completed);
    // todos.push(body.id);
    
    todos.push(body);
    
    console.log("description " + body.description );
    console.log("completed " + body.completed);
    console.log(todoNextId);
    res.json(body);
})




app.listen(PORT, process.env.IP,function(){
    console.log("Batman the server is serving");
    console.log("Express listening on port " + PORT + "!");
});