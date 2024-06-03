const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

module.exports = app;




// mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web