


const express = require ('express'); //  imports Express as a function 
const sendEmails = require('./mail'); // imports mail.js as a function
const path = require ('path'); // the path module provides utilities for working with pathfiles. pwd, directory names, etc. 

const app = express(); // used for readability


// This is how express intakes a request and outputs a response. 
// Starts with request. MIDDLEWARE STACK: 1. is Body parsing. 2. is Authentication. 3. is router. 
// .. Ends with response. 
// Middleware usually is USE, GET, and LISTEN. 

app.use(express.static(__dirname +  '/images' ));

// -------------------BODYPARSER SECTION!!---------------------------
// express.json and express.urlencoded sends some data object to the server. NEEDED FOR POST AND PUT.
// that object is enclosed in the body "req.body"

app.use(express.urlencoded({extended:false})); 
// ^^ express.urlencoded is a method inbuilt in express to recognize 
// the income request object as STRINGS OR ARRAYS. 
// If extended is true then that means the incoming request is an object or a nested object. 

app.use(express.json()); 
// A express.json() is an inbuilt method that helps to recognize the incoming request object 
// as a JSON OBJECT. 

// ------------------------------------------------------------------------------

app.post('/email', (req,res)=>
{
    // app.post is used for submitting data to servers
    const {email, subject ,text} = req.body; 
    // ^^^^^ stores in the format of an object and json, and breaks and labels them up as email, subject, text 
    console.log('Data: ', req.body);
    sendEmails(email,subject,text, (err,data)=>
    {
        if (err)
        {
            res.status(500).json({message: 'internal Error'});
            return;
        }
        else
        {
            res.json({message: 'Email sent!!'});
        }
    });

    // ^^ sendEmails formats a JSON object and catches any internal errors from the transporter.
    // function(err,data) helps catch any errors from the overall app.post. 

});


app.get('/Contact.html', (req,res)=>
    // app.get is used to retrieve data from servers.
    {res.sendFile(path.join (__dirname,'Contact.html',));}
    // retrieves data from the http server '/' and then sends the http server to work with index.html
);

app.get('/News.html', (req,res)=>
    // app.get is used to retrieve data from servers.
    {res.sendFile(path.join (__dirname,'News.html',));}
    // retrieves data from the http server '/' and then sends the http server to work with index.html
);
app.get('/index.html', (req,res)=>
    // app.get is used to retrieve data from servers.
    {res.sendFile(path.join (__dirname,'index.html',));}
    // retrieves data from the http server '/' and then sends the http server to work with index.html
);


app.listen(443, () => (console.log ('Server is starting on Port, ',443)));

//app.listen is like telling your app to start listening for incoming visitors on a specific address and port.