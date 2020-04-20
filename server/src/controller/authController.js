//here we are going to setup our routes.
const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');

//here we are going to import our user model, and our verifyToken controller.
const User = require('../models/users');
const verifyToken = require('./verifyToken');

//here we are going to define our routes.

//our main route
router.get('/', async (req, res) => {
    try{
       const uData = await User.find();
       res.json(uData);
    } catch (err) {
        res.json('Something went wrong!');
    }
});

//our register route.
router.post('/api/register', async (req, res) => {
    try {
        //here we are receiving our data.
        const data = req.body;
        console.log(data);
      
        //here we are creating a user.
        const user = new User({
            username: data.username,
            email: data.email,
            password: data.password
        });
        console.log(user);
        user.password = await user.encryptPassword(data.password);
        await user.save();

        //here we are creating a token for each user.
        const token = jwt.sign({username: user.username}, 'mytoken', {
            expiresIn: 60 * 60 * 2
        });

        res.json({ token: token });

    } catch(err) {
        console.log(err);
        res.status(500).send('Something happened!');
    };
});

//our main (dashboard route).
router.get('/api/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(404).send('The user wasn\'t found');
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.json('Something happened!');
    };
});

//our login route.
router.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(404).send('Wrong email!');
        }
        const validPassord = await user.comparePassword(req.body.password, user.password);
        if (!validPassord) {
            return res.status(404).send('Wrong password!');
        }
        const token = jwt.sign({username: user.username}, 'mytoken', {
            expiresIn: 60 * 60 * 2
        });
        res.json({token: token});
    } catch (err) {
        res.json('Something went wrong!');
    }
});

//our loggout route.
router.get('/api/logout', (req, res) => {
    res.status(200).send({auth: false, token: null});
});

module.exports = router;