const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username has to be at least 5 characters long!'],

    },
    email: {
        type: String,
        required: [true, 'E-mail is required!'],
        minLength: [10, 'E-mail has to be at least 10 characters long!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password has to be at least 4 characters long!'],
    }
});

userSchema.virtual('rePassword').set(function(value) {
    if (this.password !== value) {
        throw new Error('Password mismatch!');
    }
});


userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});


const User = mongoose.model('User', userSchema);

module.exports = User;