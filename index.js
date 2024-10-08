const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 9000;
dotenv.config();

const authRouter = require("./routes/authRouter");
const orderRouter = require("./routes/orderRouter");
const brandsRouter = require("./routes/brandsRouter");
const productRouter = require("./routes/productRouter");
const urlRouter = require("./routes/urlRouter");

mongoose
	.connect(process.env.MONGO_DB_CLUSTER)
	.then(() => console.log("Db connected"))
	.catch((err) => console.log(err));

const options = {
	origin: ["https://sophia-vehicle-care.netlify.app", "http://localhost:5173"],
	AccessControlAllowOrigin: '*',
	// origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
app.use(cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://sophia-vehicle-care.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/url", urlRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
