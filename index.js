const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chefRoutes = require("./routes/chefRoutes");
const tableRoutes = require("./routes/tableRoute");
const salesService = require("./routes/salesRoutes");
const settingsRoutes = require("./routes/settingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/points", settingsRoutes);
app.use("/api", salesService);
app.use("/api/dashboard", dashboardRoutes);

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
