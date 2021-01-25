const express = require("express");
const router = express.Router();

const uploadCloud = require("../config/cloudinary");
const User = require('../models/User');

const bcrypt = require("bcrypt");
const salt = 10;

router.get("/", async function (req, res, next) {
  console.log("Get all ressources for admin");
  try {
    const users = await User.find({});
    console.log('users', users);

    res.status(200).json({users});

  } catch (errorDb) {
    console.log(errorDb);
    res.status(500).json({errorDb});

  }
});

router.get("/users/:id", async (req, res, next) => {
  console.log("Get one user");
  console.log(req.params.id);
  const userId = req.params.id;
  try{
    const foundedUser = await User.findById(userId);
    if(foundedUser) {
      res.status(200).json(foundedUser)
    }
  }catch(errDb) {
    console.log(errDb);
    res.status(400).json({message: "User not exist"})
  }
});

router.post("/users", uploadCloud.single("image"), async (req, res, next) => {
  
    console.log('req file', req.file);
    console.log('req body', req.body);
    const { ...newUser } = req.body;
    console.log('newUser', newUser)

    const foundedUser = await User.find({email: newUser.email})
    console.log('foundedUser', foundedUser);
    console.log('foundedUser length', foundedUser.length);

    if(!foundedUser.length === 0) {
      console.log('foundedUser === 0 true')
      return res.status(400).json({ message: "Email already taken" })
    }

    if(req.file) {
      newUser.avatar = req.file.path
    }

    newUser.password = bcrypt.hashSync(newUser.password, salt)
    console.log(newUser);

    try {
      const createdNewUser = await User.create(newUser);
      console.log('createdNewUser', createdNewUser)

      res.status(200).json({messgae: "User registred successfully"})
    }catch(errDb) {
      console.log(errDb)
    }
    
});

router.patch("/users/edit", uploadCloud.single("image"), async (req, res, next) => {
  console.log("user edit patch");
  try {
    console.log(req.body);
    console.log(req.file);
    const userId = req.body.userId;
    const updateUser = req.body;
    delete updateUser.userId;

    if(req.file) {
      updateUser.avatar = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateUser, {new: true});
    console.log(updatedUser);


    res.status(200).json({message: "User infos are successfully updated"})
  } catch(errDb) {
    res.status(500).json({message: "A error is append, please try it again later"})
  }
  
});

router.delete("/users/:id/delete", async (req, res, next) => {
  console.log('Admin delete one user');
  console.log(req.body);
  console.log(req.params);
  const userId = req.params.id;
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if(deletedUser) {
      res.status(200).json({message: 'User deleted successfully'})
    }
  }catch(errDb) {
    console.log(errDb);
    res.status(500).json({message: "A error is happend, can't delete this user, try it again later please."})
  }
  
})

module.exports = router;
