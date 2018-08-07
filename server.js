const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
//sudo lsof -iTCP -sTCP:LISTEN -P
const port = process.env.PORT || 3000;//Dyanmic Port

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(txt)=>{
    return txt.toUpperCase(); 
});
app.set('view engine','hbs');
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console .log(log);
    fs.appendFile('server.log',log+ '\n',(err)=>{
        if(err){
            console.log('unable to append to server.log');
        }
    });
    
    next();
});//NEEDS to call next (LOGGER)

/*app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + `/public`));// Middleware for static directory

app.get('/',(req,res)=>{
    //res.send('<h1>Hello express</h1>');
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMsg:'Welcome to the Website',
        //currentYear:new Date().getFullYear() 
    });
    /*res.send({
        name:'Lee',
        likes:[
            'comp',
            'people'
        ]
    });*/
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        //currentYear:new Date().getFullYear() 
    }); 
});

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pageTitle:'Projects Page'
    })
});


app.get('/bad',(req,res)=>{
    res.send({
        msg:'BAD ROUTE'
    });
});
app.listen(port,()=>{
    console.log(`Sever is up on Port:${port}`);
}); //DYNAMIC PORT      