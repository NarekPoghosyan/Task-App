const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const config = require('../config/default.json')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, next) => {
            try {
                req.body.id = uuid()
                const { fullName, id } = req.body

                const candidate = await User.findOne({ email })

                if (candidate) {
                    return next(new Error("Such user already exists"))
                }

                const hashedPassword = await bcrypt.hash(password, 12)

                const user = await User.create({ fullName, email, password: hashedPassword, id });
                await user.save()

                return next(null, user);
            } catch (error) {

                next(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const isMatch = await bcrypt.compare(password, user.password)

                if (!isMatch) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                const token = jwt.sign({
                    email: email,
                    userId: user.id
                }, 'jwtSecret', { expiresIn: '1h' })

                req.token = token

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('fullName').isAlpha().withMessage('Enter only alphabetic letters'),
        check('password', 'Minimum password length 6 characters').isLength({
            min: 6
        })
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration'
                })
            }
            next(null);
        } catch (e) {
            return next(new Error(e.message))
        }
    },
    passport.authenticate('signup', { session: false, }),
    (req, res) => {
        res.send({
            message: 'Authorization went correctly',
            fullName: req.body.fullName,
            id: req.body.id,
        })
    }
);

router.post(
    '/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('fullName').isAlpha().withMessage('Enter correct fullName'),
        check('password', 'Enter password').exists()
    ],

    passport.authenticate(
        'login',
        { session: false }
    ),
    (req, res) => {
        res.send({ message: "Login went correctly", fullName: req.body.fullName, token: req.token, email: req.body.email })
    }
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'jwtSecret',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    ),
);

module.exports = router