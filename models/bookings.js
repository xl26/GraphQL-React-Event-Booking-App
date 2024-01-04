const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema= new Schema({
    event:{
        type: Schema.Types.ObjectId,
        ref:'Event'
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    numberofSeats : {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Bookings',bookingSchema);