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
app.get('/widgets', function(req, res){
    Widget.find({}, function(err, widgets){
        res.json(widgets);
    });
})

// Listener
app.listen(8000, function(){
    console.log("Server started at port 8000");
})
