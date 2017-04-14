"use strict";
const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();

app.use("/public", express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/game.html");
});

app.listen(PORT, function(){
  console.log(PORT);
});
