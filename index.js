var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
const bodyParser = require('body-parser')

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const mongoose = require('mongoose')
, cors = require('cors');
var app = express();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Connect to Mongoose and set connection variable

mongoose.connect('mongodb+srv://namrata:Swapnac123@cluster0-jvvsr.mongodb.net/faith?retryWrites=true')
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.on('open', () => console.log('successfully connected with mongodb..'))

//customers
const custContoller = require('./controllers/Customer');

app.post('/api/v1/cust', custContoller.postCust);
app.post('/api/v1/customer', custContoller.custSignUp);

app.get('/api/v1/customers', custContoller.getAllCustomers);

//feedbacks by customer and their details
const contContoller = require('./controllers/Customer');

app.post('/api/v1/contact', contContoller.feedbackAdded);

app.get('/api/v1/contacts', contContoller.getAllCustomersFeedbacks);

//feedbacks by customer and their details
const offerContoller = require('./controllers/Customer');

app.post('/api/v1/offer', offerContoller.offersCust);

app.get('/api/v1/offerCust', offerContoller.getAllCustOffers);
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running index.js on port " + port);
});