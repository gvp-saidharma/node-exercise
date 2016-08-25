var express = require('express');
var url = require('url');
var request = require("request");

var app = express();


app.get('/:id', function(req, res) {
	try {
	// Read the JSON Payload request
	jsonRequest = req.body;
	var parameter = req.params.id;
	console.log('' + parameter);
	
	request({
		  uri: "https://swapi.co/api/species/"+parameter,
		  method: "GET",
		  timeout: 5000,
		  form: req.body
		}, function(error, response, body) {
			if(error) {
				res.status(200).send(JSON.stringify(error));
			} else {
				res.status(200).send(JSON.stringify(JSON.parse(response.body)));
			}
		});
	
	} catch (err) {
		console.log(err);
	}
	
});

app.get('/', function(req, res) {
	try {
	request({
		  uri: "https://swapi.co/api/species/",
		  method: "GET",
		  timeout: 5000,
		  form: req.body
		}, function(error, response, body) {
			if(error) {
				res.status(200).send(JSON.stringify(error));
			} else {
				var param = req.query.sort;
				var list = JSON.parse(response.body);
				var list = list.results;

				if(!param){
					res.status(200).send(JSON.stringify(JSON.parse(response.body)));
				}else if(list.length>0 && list[0][param]!=null){
					list.sort(function(x, y){
				    	//return x.height - y.height;
				    	return x[param] - y[param];
					});
					var json = JSON.parse(response.body);
					json.results = 	list;	
					res.status(200).send(JSON.stringify(json));
				}else{
					res.status(200).send("Unable find the sort coloum");	
				}
			}
		});
	
	} catch (err) {
		console.log(err);
	}
	
});

module.exports = app;