
var express = require('express'),
    app = express()
console.log(`worker ${cluster.worker.id} is listening on port ${port}...`);

var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');

http.createServer(app).listen(80, function (e) {
    if(e){
        console.log("error catch 80");
        if(!canRunSSH){
            return;
        }
        // canRunSSH = false;
        // console.log("catch run!!!");
        // var testscript = exec('sh db_run.sh /root')
        //   testscript.stdout.on('data', function(data){
        //       console.log(data); 
        //       // sendBackInfo();
        //   });

        //   testscript.stderr.on('data', function(data){
        //       console.log(data);
        //       // triggerErrorStuff(); 
        //   });
    }
});

app.post('/api/getLarge', async (req, res) => {
    // price, user_id, token
    var rawdata = fs.readFileSync('large.json');
    var json = JSON.parse(rawdata);
    if(req.body.offset != undefined && req.body.count != undefined){
        json = json.splice(req.body.offset, req.body.count);
    }

    return res.send(json)
});
app.post('/api/getMedium', async (req, res) => {
    // price, user_id, token
    var rawdata = fs.readFileSync('medium.json');
    var json = JSON.parse(rawdata);
    if(req.body.offset != undefined && req.body.count != undefined){
        json = json.splice(req.body.offset, req.body.count);
    }
    return res.send(json)
});
app.post('/api/getSmall', async (req, res) => {
    // price, user_id, token
    
    var rawdata = fs.readFileSync('small.json');
    var json = JSON.parse(rawdata);

    if(req.body.offset != undefined && req.body.count != undefined){
        json = json.splice(req.body.offset, req.body.count);
    }
    return res.send(json)
});



