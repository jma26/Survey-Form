var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

//Session
app.use(session({secret: 'codingdojoisawesome'}));
//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
//Set route for static content
app.use(express.static(__dirname + '/static'));
//Set route for ejs views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index.ejs');
})

app.get('/resultpage', function(request, response) {
    var info = [
        {name: request.session.name,
        location: request.session.location,
        language: request.session.language,
        comment: request.session.comment}
    ];
    response.render('result.ejs', {info: info});
})

//NOTE: Do not render on POST
app.post('/result', function(request, response) {
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.comment = request.body.comment;
    response.redirect('/resultpage');
})

app.listen(8000, function() {
    console.log('Current is listening: 8000');
})