const express = require("express");
const app = express();
const mongoose = require("mongoose");
const LocationModel = require("./models/Location");
require("dotenv").config();
const cors = require("cors"); //connects API to react

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.get("/fetchAll", async (req, res) => {
    const { name, category, address
    
    } = req.query;


    const projection = {
        "Name": 1,
        "Category": 1,
        "Address": 1,
        "Tags": 1,
        "Avg Price per Person": 1,
        "Price": 1,
        "Video": 1,
        "Photos": 1,
        "Notes": 1,
        "Website": 1,
        "Socials": 1,
        "Phone": 1,
        "location": 1
    }

    try {
      let filter = {};

      if (name) {
        filter.Name = name;
      }
      
      if (category) {
        filter.Category = category;
      }

      if (address) {
        filter.Address = address;
      }

    //   console.log(filter);
      
      const result = await LocationModel.find(filter, projection);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });

/* This get request returns all rows that matches the conditions in req. */
app.get("/locations/:category", async (req, res) => {
    //const category = req.body.category;
    const projection = {
        "Name": 1,
        "Category": 1,
        "Address": 1,
        "Latitude": 1,
        "Longitude": 1,
        "Tags": 1,
        "Avg Price per Person": 1,
        "Price": 1,
        "Video": 1,
        "Photos": 1,
        "Notes": 1,
        "Website": 1,
        "Socials": 1,
        "Phone": 1
    }

    try {
        const result = await LocationModel.find(req.body, projection);
        res.json(result);
    } catch (err) {
        res.json(err);
    }
});

//Example of req.body
// {
//     "Category": "Restaurant",
//     "Pork Free": 1
// }


app.listen(3001, () => {
    console.log("server is running");
})
