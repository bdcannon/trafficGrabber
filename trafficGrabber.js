var http = require('http');
var exec = require('child_process').exec;
var express = require('express');
var app = express();
var mphExp = /(\d{1,2}) mph/ig;

setInterval(getAverageSpeed,1000 * 60 * 10);

app.get('/', function(){
  
});

function getAverageSpeed(){
  exec('curl traffic.calit2.net/la/traffic.jsp?hwyid=44', function(err, stdout, stderr){
    // Loop through each match
    var speeds = [];
    var match;

    while(match = mphExp.exec(stdout)){
       speeds.push(parseInt(match[1]));
       //speeds.push(match[1]);
    }
    // Sanity Check
    //console.log("Length of the speeds is " + speeds.length);

    var totalSpeed = 0;
    var averageSpeed;
    for(var i = 0; i < speeds.length; i++){
        totalSpeed += speeds[i];
    }
    averageSpeed = totalSpeed / speeds.length;
    console.log("The average speed on the 405 is " + averageSpeed );
  });
}
