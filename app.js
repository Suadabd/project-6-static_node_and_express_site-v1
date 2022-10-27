
//var I'm working with
const express = require('express');
const {projects} = require('./data.json');   ///const config = require('/path/to/file');

const app = express();


///Setting up middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public'));


////Setting up Routes
app.get('/', (req, res )=> {
    res.render('index', {projects} )
});
app.get('/about', (req, res )=> {
    res.render('about')
});
///Dynamic Project Routes
app.get('/project/:id', (req, res, next) => {
    const id  = req.params.id;
    // const project = projects[id];
    if (id <= projects.length && id >= 0 ) {
        res.render('project', { project: projects[id] });
    } else {
        next();
    }
});

//*Handle errors*//
// 404 err
app.use((req, res, next) => {
    const err = new Error('Page Not Found')
    err.status = 404;
    console.log(err.message)
    next(err);
});
// 500 err
app.use((err, req, res, next) => {
    const error = {
        message: 'Internal Server Error',
        status: 500
    };
    res.status(err.status || 500);
    console.log(error.message)
    
});
//running the server: Which port app is listening to
app.listen(3000, ()=> {
console.log('The application is running on localhost:3000')

});