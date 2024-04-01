const express = require("express");
const app = express();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const router = express.Router();
// const {sing_up, staff, profile, master_shop} = require("../models/all_models");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const auth = require("../middleware/auth");

router.post("/login", async(req, res) => {
    try {
        const {username, password} = req.body
        const result = await User.findOne({ where: { userName: username }});
       res.json(result)
    } catch (error) {
        console.log(error);
    }
})

router.post("/signup", async(req, res) => {

    const {firstname, lastname, email, username, password} = req.body
    const hash = bcrypt.hashSync(password, 10);
    try{
        const [row, created] = await User.findOrCreate({
            where:{ userName : username},
            defaults: {
                firstName : firstname,
                lastName : lastname, 
                email  : email,
                password : hash,
                userName : username
            }
        });

        res.status(200).json({ data: row , isCreated : created})

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
  }
    
})


module.exports = router;