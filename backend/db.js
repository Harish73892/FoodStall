require("dotenv").config();
const mongoose = require("mongoose");

function connectDb() {
  mongoose.connect(process.env.DataBaseURI);

  const connection = mongoose.connection;

  connection
    .once("open",async() => {
      console.log("database connected.");
      let fetched_data = await mongoose.connection.db.collection("food-items");
    fetched_data= await  fetched_data.find({}).toArray();
    if(!fetched_data){
        console.warn("data not found")
    }else{
         
        //  console.log(global.food_items);
        let food_category = await mongoose.connection.db.collection(
          "food-category"
        );
        food_category = await food_category.find({}).toArray();
        if (!food_category) {
          console.warn("data not found");
        }
        else{
          global.food_items = fetched_data;
          global.food_category=food_category;

        }
    }
        
    })
    .on("error", (err) => {
      console.log("connection failed.", err);
    });
}

module.exports = connectDb;
