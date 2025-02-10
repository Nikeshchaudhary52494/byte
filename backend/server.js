const app = require("./app");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const connectDatabase = require("./database/database");


//Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`)
    console.log(`shuttingdown the server due to Uncaught exception`)
    process.exit(1);

})

//config
dotenv.config();

// connecting database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// Unhandeled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error:${err.message}`);
    console.log(`shuttingdown the server due to unhandeled Promise rejection`)
    server.close(() => {
        process.exit(1);
    })
})