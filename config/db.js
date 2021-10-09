const mongoose = require("mongoose");

mongoose
    .connect
    (
    "mongodb+srv://" + process.env.DB_USER_PASS + "@mongodb-st2awd.3xjcr.mongodb.net/st2awd-project",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        }
)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => console.log("Failed to connect to mongo DB", err));