const express = require("express");
const morgan = require("morgan");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler} = require("./middleware/errorMiddleware");



const app = express();
app.use(morgan('dev'));
dotenv.config();
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;;


app.get('/',(req,res) => {
    console.log(req);
    console.log(res);
    res.send("running");
}); 

app.use("/api/user",userRoutes);
app.use('/api/chat',chatRoutes);
app.use("/api/message", messageRoutes);


app.use(notFound);
app.use(errorHandler);


const server = app.listen(
    5000,
    console.log(`Server Started on PORT ${PORT}`));
    
