const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const UserRoute = require('../Server/routes/userRoute');
const BlogRoute = require('../Server/routes/blogRoute');

const app = express();
app.use(express.json());

//ROUTES
app.use('/', UserRoute);
app.use('/home/:id', BlogRoute);
app.get('/test', (req,res) => { res.send("Hello from server") });

//DB_CONNECT
mongoose
    .connect(process.env.DB_STRING)
    .then(() => {
        console.log("DB Connected!");
        app.listen(process.env.PORT || 3001, () => {
            console.log(`Server running on Port: ${process.env.PORT}`);
        });
    })
    .catch(() => {
        console.log("DB Connection Failed!")
    })

