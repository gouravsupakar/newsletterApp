

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { log } = require("console");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req , res){
    
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;


    const data = {
        members : [
           {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: fName,
                LNAME: lName
              }

           }
        ]
    }

    const jsonData = JSON.stringify(data); // to convert java script object into json format
     
    // now when we want to post data to  external resosure we use the https.request method

    const url = "https://us12.api.mailchimp.com/3.0/lists/6e4efa8d4d";

    const options={

        method: "POST",
        auth: "GouravS2:a395d14f644a7f99f90a99b10ab7f9be-us12"
    }
    
   const request = https.request(url , options , function(response){
             
          if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
          } else{
            res.sendFile(__dirname + "/failure.html");
          }
    
               response.on("data" , function(data){
               console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();



});



app.post("/failure", function(req , res){   //this post request is made on the failure root to redirect the user to the home root
    res.redirect("/");       // res.redirect this will redirect the user to thr home root
});







app.listen(process.env.PORT || 3000, function(){
    console.log("Server is up and running on port 3000.");
});





//API KEY
// a395d14f644a7f99f90a99b10ab7f9be-us12

//list id
// 6e4efa8d4d
