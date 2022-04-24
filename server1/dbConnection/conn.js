const mongoose = require('mongoose');
require('dotenv').config()
// const dbUrl = 'mongodb+srv://nilesh7575:nilesh7575@cluster1.yu7bw.mongodb.net/userdata?retryWrites=true&w=majority';

const dbUrl = process.env.DATABASEURL



mongoose.connect(
    dbUrl,{
        useNewUrlParser:true,
        useUnifiedTopology:true        
    },(err)=>{
        if(!err) {
            console.log('DB Connected');
        }else{
            console.log('Not Connected')
        }
    }
)