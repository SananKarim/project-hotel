const express = require("express");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/jwtValidation");
const ownerRouter = require("./routes/ownerRoutes");
const customerRouter = require("./routes/customerRoutes");

const app = express();

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());

app.listen(5001, () => {
  console.log("server started");
});

app.get("*", checkUser);

app.use("/customer", customerRouter);
app.use("/owner", ownerRouter);
