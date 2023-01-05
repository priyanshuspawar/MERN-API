const mongoose = require("mongoose");

const connectDb = async () => {
  try {
      await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};


module.exports=connectDb;