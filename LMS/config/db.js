const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/CrudDB',{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true
}).then(()=>{
	console.log('connected to db');
}).catch(err=>{
	console.log('error'.err.message);
});

module.exports=mongoose;