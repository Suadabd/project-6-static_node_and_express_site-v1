
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
app.get('/', (req, res )=> {
    res.render('about')
});
app.get('/project/:id', (req, res) => {
    const { id } = req.params;

    if (id < projects.length){
        const project = projects[id];
        res.render('project', { project });
    } else {
        res.status = 404;
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

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status); 
    res.render('error');
})

// 500 err
app.use((err, req, res, next) => {
    const error = {
        message: 'Internal Server Error',
        status: 500
    };
    res.status(err.status || 500);
    console.log(error.message)
    res.render('error', { error });
});


//running the server: Which port app is listening to
app.listen(3000, ()=> {
console.log('The application is running on localhost:3000')

});