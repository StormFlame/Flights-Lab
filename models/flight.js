const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['Aus', 'DFW', 'DEN', 'LAX', 'SAN']
    },

    arrival: Date
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Delta', 'Southwest', 'United']
    },

    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
    },

    flightNo: {
        type: Number,
        required: true
    },

    departs: {
        type: Date,
        default: function(){
            const year = new Date()
            return year.setFullYear(year.getFullYear() + 1);
        }
    },

    destinations: [destinationSchema]

});

module.exports = mongoose.model('Flight', flightSchema);