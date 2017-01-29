var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser');
/* https://en.wikipedia.org/wiki/Cross-origin_resource_sharing 
 * Cross origin resource sharing */
var cors = require('cors');
var app = express();

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json(), cors());

var test = {
	"test" : {
		"asd" : "asd"
	}
}

var database = mysql.createPool({
	connectionLimit : 100,
	host : "localhost",
	user : "root",
	password : "",
	database : "guestbook"
});


app.get("/test", function(req, res){
	console.log(test);
	res.end(JSON.stringify(test));
	
});

//	Read all, READ
app.get("/posts/all", function(req, res){
	database.getConnection(function(err, connection){
		if(err){
			connection.release();
			res.json({"status" : "Error!"});
			return;
		}
		var query = "SELECT * FROM post WHERE 1;";
		connection.query(query, function(err, rows){
			if(!err){
				console.log("returning: " + rows);
				res.end(JSON.stringify(rows));
			}else{
				console.log("queried, Error " + err);
			}
		});
	});
});

//	Read one, READ
app.get("/posts/:id", function(req, res){
	var id = req.params.id;
	if(id != null){
		database.getConnection(function(err, connection){
			if(err){
				connection.release();
				res.json({"status" : "Error!"});
				return;
			}
			var query = "SELECT * FROM post WHERE ID=" + id +";";
			connection.query(query, function(err, rows){
				if(!err){
					console.log("returning: " + rows);
					res.json(rows);
				}else{
					console.log("queried, Error " + err);
				}
			});
		});
	}
});

//	Add post, CREATE
app.put("/posts/create", function(req, res){
	console.log("CREATE");
	database.getConnection(function(err, connection){
		if(err){
			connection.release();
			res.json({"status" : "Error!"});
			return;
		}
		
		var postText = req.body.text;
		var postCity = req.body.city;
		var postName = req.body.name;
		
		var query = "INSERT INTO post (post, city, name) values ('" 
		+ postText + "', '" + postCity + "', '" + postName + "');";
		connection.query(query, function(err, rows){
			if(!err){
				//console.log("returning: " + rows);
				res.json({"Status" : "OK!"});
				//res.json(rows);
			}else{
				console.log("queried, Error " + err);
			}
		});
	});
});

//	UPDATE a value
app.post("/posts/update", function(req, res){
	console.log("UPDATE ");
	console.log(req.body);
	database.getConnection(function(err, connection){
		if(err){
			connection.release();
			res.json({"status" : "Error!"});
			return;
		}
		
		var postId = req.body.id;
		var postText = req.body.text;
		var postCity = req.body.city;
		var postName = req.body.name;
		
		var query = "UPDATE post SET post='" + postText 
			+ "', city = '" + postCity 
			+ "', name='" + postName 
			+ "' WHERE ID = " + postId + ";";
		
		connection.query(query, function(err, rows){
			if(!err){
				//console.log("returning: " + rows);
				res.json({"Status" : "OK!"});
				//res.json(rows);
			}else{
				console.log("queried, Error " + err);
			}
		});
	});
	
});

//	DELETE a value
app.delete("/posts/:id", function(req, res){
	console.log("DELETE");
	database.getConnection(function(err, connection){
		if(err){
			connection.release();
			res.json({"status" : "Error!"});
			return;
		}
		
		var postId = req.params.id;
		console.log("ID: " + postId);
		
		var query = "DELETE from post where ID = '" + postId + "';";
		
		connection.query(query, function(err, rows){
			if(!err){
				//console.log("returning: " + rows);
				res.json({"Status" : "OK!"});
				//res.json(rows);
			}else{
				console.log("queried, Error " + err);
			}
		});
	});
});


var server = app.listen(3000, function(){
	
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Listening at http://%s:%s", host, port);
	

});