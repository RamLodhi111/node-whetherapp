const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast =require('./utils/forecast');
// console.log(__dirname)
// console.log(__filename)
//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsDirectoryPath = path.join(__dirname,'../template/views');
const partialDirectoryPath=path.join(__dirname,'../template/partials')

const port = process.env.port || 3000;
//To define express will use static content from this path (by default take index.html)
//setup static directory to server
app.use(express.static(publicDirectoryPath))

//To register view display to render dynamic content
//By default HBS search for views directory, to customise we need to set this
//Setup view location and handlebars engine
app.set('views',viewsDirectoryPath)
app.set('view engine','hbs');
hbs.registerPartials(partialDirectoryPath);

//Works like routing (default route) //Will not get used as by default expree will display index.html
//To show HTML response not required hooks like below and can be replaced by static content

// app.get('', (req, res) => {
//     res.send('Hello Express');
// })

app.get('', (req, res) => {
    const location = req.query.loc;
   if(!location){
        return res.render('index',{
            title:'Whether App',
            name:'Ram Lodhi',
            whether:'Pass the location name in URL to get whether info'
        })
   }
    console.log(location);
    geocode(location,(error, response)=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(response.latitude,response.longitude,(error,data)=>{
            if(error){
                return  res.send({
                    error
                })
            }
            res.send({
                location:response.place,
                summary:data.daily.summary,
                data
            })
        })
    })
    // res.render('index',{
    //     title:'Whether App',
    //     name:'Ram Lodhi',
    //     whether:'Whether for '+location+' is normal'
    // });
})

//Add route to /help
app.get('/help', (req, res) => {
   // res.send('<h1>Help page</h1>');
   res.render('help',{
    title:'Help Page',
    name:'Ram Lodhi',
    helpText:'THis is helpful text'
});
})
//Add route to /about
app.get('/about', (req, res) => {
    //res.send('About page');
    res.render('about',{
        title:'About page',
        name:'Ram Lodhi',
        about:'About this app'
    });
})
//Add route to /help
//on haome page added this
// app.get('/whether', (req, res) => {
//     res.send([{ tem: 30, humidity: 'low', location: 'Bhopal' },
//     { tem: 35, humidity: 'High', location: "Jhansi" }]
//     );
// })


//Add route to /product to  test query string 
 app.get('/product', (req, res) => {
    console.log("Query string",req.query);
    console.log("Search query",req.query.search);
if(!req.query.search){
    return res.send({
        error:"Pass the searh item in URL"
    })
}
    res.send({
        name:'Product 1',
        rating:'4.3',
        price:'100'
    });
})

//Add route to /about
app.get('*', (req, res) => {
    //res.send('About page');
    res.render('404',{
        title:'Error page',
        name:'Ram Lodhi',
        message:'The page is not found'
    });
})

//Starts the server on port 3000
app.listen(port, () => {
    console.log('Server is started on port '+port);
})

