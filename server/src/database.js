//here importing mongoose (a mongoDB ORM).
const mongoose = require('mongoose');

//here we are going to configure our db connection.
mongoose.connect('mongodb://localhost/simplejwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log(`You're connected to the db!`));

