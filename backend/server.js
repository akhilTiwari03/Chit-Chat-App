const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const colors = require('colors')
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./MiddleWares/errorMiddleWare');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // to accept the json data

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Sever Started on PORT ${port}`.yellow.bold));