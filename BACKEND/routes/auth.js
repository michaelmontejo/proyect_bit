const router = require('express').Router();
const User = require('../models/user.model');
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { id } = require('@hapi/joi/lib/base');

const schemaRegister = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(1024).required().email(),
    password: Joi.string().min(6).max(50).required(),
    apellido:Joi.string().min(4).max(255).required(),
    identificacion:Joi.number().min(1).max(99999999999).required(),
    celular:Joi.number().min(1).max(99999999999).required(),
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

    // token

    // create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
 
    res.json({
        error: null,
        mensaje: 'exito bienvenido',
        token: token
    })
})

router.post('/register', async (req, res) => {


    //validaciones de usuario

    const {error} = schemaRegister.validate(req.body)
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    // validar emial unico

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    
    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);



    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        apellido:req.body.apellido,
        identificacion:req.body.id,
        celular:req.body.celular
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router;