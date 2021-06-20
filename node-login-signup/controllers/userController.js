'use strict';

const config = require('config');
const UsersModel = require('../lib/maindb').model('Users');
const sha512 = require('js-sha512').sha512;
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res, next) => {

    console.log('+++++++++++++++', req.body)

    const userName = req.body.values.userName;
    const email = req.body.values.email;
    const password = req.body.values.password;
    const gender = req.body.values.gender;

    if (!userName || !email || !password) {
        return res.send({success: false, code: 400, msg: 'Invalid Input Parameters!'})
    }
    try {
        let user = await UsersModel.findOne({ email: email });
        if(user) {
            return res.send({success: false, code: 200, msg: 'User already exist!'})
        }
        let userObj =  new UsersModel({
            userName: userName,
            email: email,
            password: sha512(password),
            gender: gender,
        });
        await userObj.save()
        return res.send({success: true, code: 201, msg: 'User successfully registered!'})
    } catch(err) {
        console.log('===============', err);
        return res.send({success: false, code: 500, msg: 'internel server error!'})
    }
};

module.exports.login = async (req, res, next) => {
    
    const email = req.body.values.email.toLowerCase();
    let password = req.body.values.password;
    const role = req.body.values.role ? req.body.values.role : 'user';

    if (!email || !password) {
        return res.send({success: false, code: 400, msg: 'Invalid Input Parameters'})
    }

    try {
        password = sha512(password);

        let user = await UsersModel.findOne({ email: email, password: password, active: true, role: role });

        if (!user) {

            let user = await UsersModel.findOne({ email: email, password: password });

            if (!user) {
                return res.send({success: false, code: 400, msg: 'User not found, Please signup first!'})
            } else if(!user.active) {
                return res.send({success: false, code: 400, msg: 'User not activated, Please check your email to activate account!'})
            } else {
                return res.send({success: false, code: 400, msg: 'thers is some issue, Please try again!'});
            }
        } else {
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                role: user.role,
            }, config.get('secret'), {
                    expiresIn: config.get('jwt_expiretime'),
                });

                return res.send({
                    success: true,
                    code: 200,
                    token: token,
                    email: user.email
                });
        }

    } catch (err) {
        return res.send({success: false, code: 500, msg: 'internel server error'})
    }
};

module.exports.getUserList = async (req, res, next) => {

    const perPage = parseInt(req.params.perPage);
    const page = parseInt(req.params.page);
    const skip = perPage * (page - 1);

    if (perPage && page) {
        let user = await UsersModel.find({}, '-password').skip(skip).limit(perPage);
        return res.send({success: true, code: 200, result: user})
    } else {
        try {
            let user = await UsersModel.find({}, '-password');
            return res.send({success: true, code: 200, result: user})
        } catch (err) {
            console.log(err)
            return res.send({success: false, code: 500, msg: 'internel server error'})
        }
    }
    
};