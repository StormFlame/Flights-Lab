const Flight = require('../models/flight'); 
const Ticket = require('../models/ticket');

module.exports = {
    create,
    new: newTicket,
    delete: deleteTicket
}

function newTicket(req, res){
    res.render('tickets/new', {title: "New Ticket", id: req.params.id});
}

function create(req, res){

    Flight.findById(req.params.id, function(err, flight){
        req.body.flight = flight;
        const newTicket = new Ticket(req.body);
        newTicket.save(function(err){
            if(err) return res.redirect(`/flights/${req.params.id}`);
            res.redirect(`/flights/${req.params.id}`);
        });
    });
}

function deleteTicket(req, res){
    Ticket.findById(req.params.id, function(err, ticket){
        if(err) return res.redirect('/flights');
        const flightId = ticket.flight._id;

        Ticket.findByIdAndDelete(req.params.id, function(err){
            if(err) return res.redirect('/flights');
            res.redirect(`/flights/${flightId}`);
        });
    });
}