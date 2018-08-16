// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/widgets_db");
const WidgetSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title must exist.'], 
        minlength: [3, 'Lenght must be at least 3 characaters long.'] 
    },
    description: String,
    price: Number,
    qty: Number
})
mongoose.model('Widget', WidgetSchema);
const Widget = mongoose.model('Widget');

// Path
const path = require('path');
// Static Route
app.use(express.static(path.join(__dirname, 'Angular-Project/dist/Angular-Project')));

// Routes
app.get('/widgets', function(req, res) {
    Widget.find({}, function(err, widgets) {
        res.json(widgets);
    });
})

app.post('/widgets', function(req, res){
    console.log("SERVER > POST /wigets > POSTDATA: ", req.body);
    widgetInstance = new Widget();
    widgetInstance.title = req.body.title
    widgetInstance.description = req.body.description
    widgetInstance.qty = req.body.qty
    widgetInstance.price = req.body.price
    widgetInstance.save(function(err){
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            res.json(widgetInstance);
        }
    })
})

// Listener
app.listen(8000, function(){
    console.log("Server started at port 8000");
})
