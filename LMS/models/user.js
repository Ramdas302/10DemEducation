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
    isProuser:{
        type:Boolean,
        default:false
    },
    isOrg:{
        type:Boolean,
        default:false
    },
    isEducator:{
        type:Boolean,
        default:false
    },
    isStudent:{
        type:Boolean,
        default:false
    },
    groups_in:{
        type:Array,
        default:[]
    },
    projects:[{Project:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project"
        },
        project_title:String,
        project_score:Number,
        project_submitted_by:{
            type:Date,
            default:Date.now
        }
    }],
});



module.exports = mongoose.model('User', userSchema);
