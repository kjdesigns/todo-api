// var express = require("express");

// var app = express();
// var PORT = process.env.PORT;
// var bodyParser = require("body-parser");
// var _ = require("underscore");

// var todos = [];
// var todoNextId =1;

// app.use(bodyParser.json());

// //ROUTES
// //////////////////////////////////////////////////////////////////////////////////////


// //Root route
// app.get("/",function(req,res){
//     res.send("Todo API Root");
// });

// //GET /todos?completed=true
// //GET /todos?q=whateverhere
// app.get("/todos",function(req,res){
//     var queryParams= req.query;
//     var filteredTodos = todos;
    
//     //if has property && completed === "true"
//     //filtereredTodos = _.where(filteredTodos,?)
//     //else if has prop && completed if "false"
    
//     if(queryParams.hasOwnProperty("completed") && queryParams.completed==="true"){
//         filteredTodos =_.where(filteredTodos,{completed:true});
//     }else if(queryParams.hasOwnProperty("completed" && queryParams.completed ==="false")){
//         filteredTodos = _.where(filteredTodos,{completed:false});
//     }
    
//     if(queryParams.hasOwnProperty("q") && queryParams.q.length>0){
//         filteredTodos = _.filter(filteredTodos,function(){
//           return todos.description.toLowerCase().indexOf(queryParams.q.toLowerCase())>-1; 
//         });
//     }
    
//     res.json(filteredTodos);
// });

// //GET /todos/:id
// app.get("/todos/:id",function(req,res){
//     var todoId = parseInt(req.params.id,10);
//     var matchedTodo =_.findWhere(todos,{id:todoId});
    
    
//     // var matchedTodo;
//     // //Iterate of todos array. Find the match.
//     // todos.forEach(function(todo){
//     //     if(todoId ===todo.id){
//     //         matchedTodo = todo;
            
//     //     }
//     // });
    
    
    
//     if(matchedTodo){
//         res.json(matchedTodo);
//     }else{
//         res.status(404).send();
//     }
//     //res.status(404).send();
//     //res.send("Asking for todo with id of " + req.params.id); 
//     });
   



// //POST request /todos
// app.post("/todos",function(req,res){
//     var body = _.pick(req.body,"description","completed");
    
//     if(!_.isBoolean(body.completed) || !_.isString(body.description) ||body.description.trim().length===0){
//         //res.send("An Error Occurred");
//         return res.status(400).send();
//     }
    
//     body.description=body.description.trim();
    
//     //add id field
//     body.id = todoNextId++;
//     //push body into array
//     // todos.push(body.description);
//     // todos.push(body.completed);
//     // todos.push(body.id);
    
//     todos.push(body);
    
//     console.log("description " + body.description );
//     console.log("completed " + body.completed);
//     console.log(todoNextId);
//     res.json(body);
// });

// //DELETE /todos/:id
// app.delete("/todos/:id",function(req,res){
//   var todoId = parseInt(req.params.id,10);
//   var matchedTodo = _.findWhere(todos,{id:todoId});
   
//   if(!matchedTodo){
//       res.status(404).json({"Error": "no todo found with that id"});
       
//   }else{
//       todos = _.without(todos,matchedTodo);
//       res.json(matchedTodo);
//   }
   
// });

// //PUT /todos/:id
// app.put("/todos/:id",function(req,res){
//     var todoId = parseInt(req.params.id,10);
//     var matchedTodo = _.findWhere(todos,{id:todoId});
//     var body = _.pick(req.body,"description","completed");
//     var validAttributes = {};
    
//     if(!matchedTodo){
//         return res.status(404).send();
//     }
    
//     if(body.hasOwnProperty("completed") && _.isBoolean(body.completed)){
//         validAttributes.completed = body.completed;
//     }else if(body.hasOwnProperty("completed")){
//         //Bad
//         return res.status(400).send();
//     }
    
//     if(body.hasOwnProperty("description") && _.isString(body.description) && body.description.trim().length>0){
//         validAttributes.description = body.description;
//     }else if(body.hasOwnProperty("description")){
//         res.status(400).send();
//     }
    
//     //UPDATE HERE
//     _.extend(matchedTodo,validAttributes);
//     res.json(matchedTodo);
    
    
    
    
    
// });


// app.listen(PORT, process.env.IP,function(){
//     console.log("Batman the server is serving");
//     console.log("Express listening on port " + PORT + "!");
// });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// GET /todos?completed=false&q=work
app.get('/todos', function (req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		filteredTodos = _.where(filteredTodos, {completed: true});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(filteredTodos, {completed: false});
	}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function (todo) {
			return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
		});
	}

	res.json(filteredTodos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();	
	body.id = todoNextId++;

	todos.push(body);
	
	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (!matchedTodo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo);
});

app.listen(PORT, process.env.IP,function(){
    console.log("Batman the server is serving");
    console.log("Express listening on port " + PORT + "!");
});


















