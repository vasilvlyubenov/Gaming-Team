const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: 4,
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:[\/]{2}/, 'Image must start with http:// or https:// !'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: 0,
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: 10,
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: 2,
    },
    platform: {
        type: String,
        required: [true, 'Name is required!'],
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    boughtBy:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;