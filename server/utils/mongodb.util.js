const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Database connected....")
}).catch((err) => {
    console.log('MongoDB connection error: ', err)
})

mongoose.connection.on("connected", () => {
  console.log("Database connection established!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected!");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});