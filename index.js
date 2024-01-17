import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs",{content:"home.ejs"});
});

app.post("/recipe", async(req,res)=>{
    try {
        
        const response = await axios.get(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.body.input}`);
        const result = response.data;
        res.render("index.ejs", { content:"main.ejs", cocktail: result});
      } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
    
});

app.post("/",(req,res)=>{
    res.render("index.ejs",{content:"home.ejs"});
});



app.listen(port,()=>{console.log(`The server is listening at port ${port}`)});