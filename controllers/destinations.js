const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDest
}

function create(req, res){
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function deleteDest(req, res){
    console.log('id: ', req.params.id);
    Flight.findByIdAndDelete(req.params.id, function(err, result){
        if(err) return res.redirect('/flights');
        res.redirect('/flights');
    });
}