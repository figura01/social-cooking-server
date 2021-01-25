const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String},
  description: { type: String},
  ingredients:[{
    type: Schema.Types.ObjectId,
    ref: "Ingredient",
    quantity: {
      type: Number
    }
  }],

  tags: [{
    type: Schema.Types.ObjectId,
    ref: "Tag",
  }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  shared: {
    type: Boolean, default: true
  },

  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  steps: [{
    type: String
  }],

  nbLikes: {
    type: Number
  }

})

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;