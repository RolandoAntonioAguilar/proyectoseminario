const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: false,
    },
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (receivedPassword, password) => {
  return await bcrypt.compareSync(receivedPassword, password);
};

module.exports = model("User", userSchema);