const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  pseudo: { type: String, required: true },

  firstName: {type: String },
  lastName: {type: String },
  gender: {type: String, enum: ['male', 'women'], require: true, default: 'male' },
  role: {type: String, enul: ['user', 'admin'], default: 'user', require: true },
  avatar: {type: String},

  favRecipes: [{
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  }],
  favUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],

});

userSchema.pre('save', function(next) {
  if (this.gender === 'male' && this.avatar === '') {
    this.avatar = 'https://res.cloudinary.com/figura/image/upload/v1609791079/lbevhbeeuir8jkaakysy.png';
  } else {
    this.avatar = 'https://res.cloudinary.com/figura/image/upload/v1609791240/zhnhfahkvszb71opyld6.png';
  }

  next();
});


const User = mongoose.model("User", userSchema);

module.exports = User;
