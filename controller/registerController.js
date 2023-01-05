const Users= require("../public/data/Users");
const bcrypt = require("bcrypt");



const registerUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "user and password is required" });
  }
  //check duplicate
  const duplicate = await Users.findOne({user:user}).exec()
  if (duplicate) return res.sendStatus(409);
  try {
    const hashpwd = await bcrypt.hash(pwd, 10);
    const newUser = { user: user, pwd: hashpwd};
    const result = await Users.create(newUser);
    res.status(201).json({ success: `user created ${user}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
