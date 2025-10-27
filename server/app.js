


// const express = require("express");
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// require('dotenv').config(); 


// const paymentRoute = require("./routes/payment");
// const adminRoute = require("./routes/adminRoute");
// const productRoute = require("./routes/productRoute");
// const userRoute = require("./routes/userRoute");



// const PORT = process.env.PORT || 8080;


// mongoose.connect(process.env.DBCON)
//     .then(() => console.log("DB Connected Successfully!"))
//     .catch(err => console.error("DB Connection Failed:", err));


// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());




// app.use("/admin", adminRoute);
// app.use("/product", productRoute);
// app.use("/user", userRoute);
// app.use("/api/payment", paymentRoute);



// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();

// // 🟢 Routes
// const paymentRoute = require("./routes/payment");
// const adminRoute = require("./routes/adminRoute");
// const productRoute = require("./routes/productRoute");
// const userRoute = require("./routes/userRoute");

// // 🟢 Config
// const PORT = process.env.PORT || 8080;

// // 🟢 MongoDB Connection
// mongoose
//   .connect(process.env.DBCON, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected Successfully!"))
//   .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// // 🟢 Middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL, // from Render env
//     credentials: true,
//   })
// );
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // 🟢 Routes
// app.use("/admin", adminRoute);
// app.use("/product", productRoute);
// app.use("/user", userRoute);
// app.use("/api/payment", paymentRoute);

// // 🟢 Default Route
// app.get("/", (req, res) => {
//   res.send("Server is running successfully 🚀");
// });

// // 🟢 Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// 🟢 Routes
const paymentRoute = require("./routes/payment");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

// 🟢 Config
const PORT = process.env.PORT || 8080;

// 🟢 MongoDB Connection
mongoose
  .connect(process.env.DBCON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// 🟢 Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🟢 Routes
app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/api/payment", paymentRoute);

// 🟢 Default Route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// 🟢 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

