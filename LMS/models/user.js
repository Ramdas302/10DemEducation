const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
    username:{
        type: String,
        required: true,
      
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true
    },
    confirmpassword: {
        type: String,
        minlength: 4,
        required: true
    },

  
});



module.exports = mongoose.model('User', userSchema);
