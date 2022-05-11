const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL || "mongodb://localhost/yelp_camp";
module.exports = function () {
	mongoose
		.connect(
			"mongodb+srv://campground:campground@cluster0.8croi.mongodb.net/campground?retryWrites=true&w=majority",
			{
				useUnifiedTopology: true,
				useCreateIndex: true,
				useNewUrlParser: true,
			}
		)
		.then(() => console.log("DB connected"))
		.catch((error) => console.log("DB error", error));
};
