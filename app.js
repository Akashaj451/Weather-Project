const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req, res){
const textbox = req.body.cityName;
console.log(textbox);
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ textbox +"&units=metric&appid=14b66c716536537a6081c43fb7bd3eb1";

  https.get(url, function(response) { // used to move in to the url from route
  response.on("data", function(data) {// used to tap on to the getting data from app.get

    const weatherData2 = JSON.parse(data).main.temp;
    const weatherData1 = JSON.parse(data).name;
    const ic = JSON.parse(data).weather[0].icon;
    const icon = "http://openweathermap.org/img/wn/" + ic + "@2x.png"
    res.write("<p>Your City Weather is Here!!!</p>");
    res.write("<h1>The Weather in " + weatherData1 + " is " + weatherData2 + " degree celsious</h1>");
    res.write("<img src =" + icon + " >");
    res.send();
  });
});
});

app.listen(3000, function() {
  console.log("Server Running on Port 3000");
});
