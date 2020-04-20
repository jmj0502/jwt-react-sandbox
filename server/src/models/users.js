//here we are going to create our user model.
const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

//setting our user model up.
const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

//here we are going to define the encryption methods for our user schema.

//this method will encrypt it's password.
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

//this method will compare our passwords.
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

//here we export our module.
module.exports = model('User', userSchema);