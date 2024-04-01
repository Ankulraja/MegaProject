const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect =() => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(()=>{console.log("Database connection successfully")})
    .catch((err) => {
      console.log("Error in Connecting to database");
      console.log(err);
      process.exit(1);
    });
};

module.exports =dbConnect;