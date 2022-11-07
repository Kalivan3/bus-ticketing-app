const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    route:{
        type: String,
        required: [true, 'Please select a route'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Please pick a date'],
        trim: true
    },
    time:{
        type: String,
        required: [true, 'Please pick a time of departure'],
        trim: true
    },
    amount:{
        type: Number,
        required: true,
        trim: true
    },
    user: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model("Ticket", ticketSchema);