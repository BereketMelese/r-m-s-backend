const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chefRoutes = require("./routes/chefRoutes");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/chefs", chefRoutes);

// app.listen(5000);

mongoose
  .connect(
    "mongodb+srv://bereket:Password123@food.v5oim.mongodb.net/?retryWrites=true&w=majority&appName=FooD"
  )
  .then(
    app.listen(5000, () => console.log("server is running")) &&
      console.log("Connected to db")
  )
  .catch((err) => console.log(err));
