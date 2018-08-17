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

app.get('/widgets/:id', function(req, res){
    console.log("@@@@ 3")
    Widget.findById(req.params.id, function(err, widget){
        if(err){
            res.json(err);
        } else {
            console.log("@@@@ 4", widget)
            res.json(widget);
        }
    })
})

app.delete('/widgets/:id', function(req, res) {
    console.log("SERVER > delete widgets/id, id:", req.params.id)
    Widget.deleteOne({_id: req.params.id}, function(err){
        if(err){
            res.json(err);
        } else {
            res.json(true);
        }
    })
})

app.put('/widgets/:id', function(req, res) {
    console.log("SERVER > put widgets/id");
    console.log("SERVER > put widgets/id params.id", req.params.id);
    console.log("SERVER > put widgets/id body", req.body);
    Widget.findById(req.params.id, function(err, widget){
        console.log("SERVER > findbyid, err ", err)
        console.log("SERVER > findbyid, widget ", widget)
        if(err){

        } else {
            console.log("widget found for update:", widget);
            widget.title = req.body.title;
            widget.description = req.body.description;
            widget.qty = req.body.qty;
            widget.price = req.body.price;
            widget.save(function(err){
                if(err){
                    res.json(err);
                } else {
                    res.json(true);
                }
            })
        }
    })
})

// Listener
app.listen(8000, function(){
    console.log("Server started at port 8000");
})
