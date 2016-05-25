var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var sequelize;

if(env==="production"){
<<<<<<< HEAD
	sequelize = new Sequelize(process.env.DATABASE_URL,{
=======
<<<<<<< HEAD
	sequelize = new Sequelize(process.env.DATABASE_URL,{
=======
	sequelize = new Sequelize(process.env.DATABAE_URL,{
>>>>>>> d4097dd1b570f84368123d67db1500492e592082
>>>>>>> 4655c16596bce3a665e9240ad25c2691980a2a90
		dialect:"postgress"
	});
}else{
	sequelize = new Sequelize(undefined,undefined,undefined,{
	    "dialect":"sqlite",
	    "storage":__dirname + "/data/dev-todo-api.sqlite"
	});
}


var db = {};

db.todo = sequelize.import(__dirname+"/models/todo.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;