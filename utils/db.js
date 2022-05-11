const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL || "mongodb://localhost/yelp_camp";
module.exports = function () {
	mongoose
		.connect(DB, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true,
		})
		.then(() => console.log("DB connected"))
		.catch((error) => console.log("DB error", error));
};
