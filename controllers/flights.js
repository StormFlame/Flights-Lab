const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    create,
    new: newFlight,
    show,
    delete: deleteFlight
}

function index(req, res){
    Flight.find({}, function(err, flights){
        res.render('flights/index', {title: 'Flights', flights});
    });
}

function create(req, res){

    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
      }

    const flight = new Flight(req.body);

    flight.save(function(err){
        if(err) return res.render('flights/new');
        res.redirect('/flights/new');
    });
}

function newFlight(req, res)
{
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    const departsDate = dt.toISOString().slice(0, 16);

    res.render('flights/new', {title: 'New Flight', departsDate});
}

function show(req, res){
    Flight.findById(req.params.id, function(err, flight){
        Ticket.find({flight: flight._id}, function(err, tickets){
            res.render('flights/show', {title: 'Flight Details', flight, tickets})
        });
    });
}

function deleteFlight(req, res){
    Flight.findByIdAndDelete(req.params.id, function(err){
        Ticket.findByIdAndDelete({flight: req.params.id}, function(err, tickets){
            if(err) return res.redirect('/flights');
            return res.redirect('/flights');
        });
    });
}