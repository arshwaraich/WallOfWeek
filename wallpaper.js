const request = require('request');
const express = require('express');
const app = express();

//Setting up port
const HTTP_PORT = 8083;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

//API request
var url;

function apiCall(dur) {
    var bodyJSON;

	return new Promise(function(resolve, reject) {
    		request('https://www.reddit.com/r/wallpapers/top.json?t=' + dur + '&limit=1', (error, response, body) => {
	        	console.log('error:', error);
        		console.log('statusCode:', response && response.statusCode);
        		bodyJSON = JSON.parse(body);
        
       		 	url = bodyJSON.data.children[0].data.url;
    			resolve();
		});
	});
}

//Default path
app.get('/', (req,res) => {
	apiCall('week')
	.then(()=> {
		request(url).pipe(res);
	});
});

app.get('/:duration', (req,res) =>{
	apiCall(req.params.duration)
	.then(()=> {
		request(url).pipe(res);
	});
});

app.listen(HTTP_PORT, onHttpStart);
