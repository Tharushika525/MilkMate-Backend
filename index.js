// console.log("Node is Running...")

const { default: mongoose } = require('mongoose');
const app = require('./app');
const port = 3001;
const host = '127.0.0.1';

const server = app.listen(port,host, () =>{
    console.log(`Node server is listening to ${server.address().port}`)
});

mongoose.connect("mongodb+srv://Tharushika:MilkMate2024@milk-mate-web.rd3iyax.mongodb.net/?retryWrites=true&w=majority&appName=Milk-Mate-Web")
.then(()=>{
    console.log('Connected to Database');
})

.catch(err =>{
    console.log("Can't connect to Database")
})