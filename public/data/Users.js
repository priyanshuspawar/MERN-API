const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  RefreshToken : String
});

module.exports=mongoose.model("Users",UsersSchema);