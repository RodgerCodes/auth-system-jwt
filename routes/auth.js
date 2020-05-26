const router =require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const {loginvalidate} = require('../validation')


router.post('/register', async(req, res) => {

//   const {error} =  validateUser(req.body);
//     if(error) return res.status(400).send(error.details[0].message)

    // check if email already exist
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist){
        return res.status(400).send('Email already exist')
    }


    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


  
  const user = new User({
   name:req.body.name,
   email:req.body.email,
   password:hashedPassword
  });


  try {
      const savedUser = await user.save()
      res.send({user:savedUser._id})
  } catch (err) {
      res.status(400).send(err)
  }
})


// login
router.post('/login', async(req, res) => {
  const {error} = loginvalidate(req.body)
  if(err) return res.send(400).send(error.details[0].message)
 

//   checking if password exist
  const user = await User.findOne({email:req.body.email})
 if(!user) return res.status(400).send('email does not exist')

//  check if password exist
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

// creat and assign a token
    const token = jwt.sign({_id:user_id},'skjhdjkahkjdahkj');
    res.header('auth-token', token).send(token)

})

module.exports = router;