const express = require('express');
const app = express();
const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost/jwtauth',{ useNewUrlParser: true } ,() => {
    console.log('Successfully connected to Database')
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/user', require('./routes/auth.js'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`)
})