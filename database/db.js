const mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://admin14:samit123456@@cluster0.hbck8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true 
})
