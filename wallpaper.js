const request = require('request');
const express = require('express');
const app = express();

//Setting up port
const HTTP_PORT = 8083;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}


//Default path
app.get('/', (req,res) =>{

    //API request
    var bodyJSON;

    request('https://www.reddit.com/r/wallpapers/top.json?t=week&limit=1', (error, response, body) => {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        bodyJSON = JSON.parse(body);
        
        request(bodyJSON.data.children[0].data.url).pipe(res);
    });
})

app.listen(HTTP_PORT, onHttpStart);
