const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/shiftly')
    .then(()=> console.log('MongoDB connected successfully!'))
    .catch((err)=> console.error('MongoDB connecting failed:',err));

const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);

const shiftRoute = require('./routes/shiftRoute');
app.use('/api/shifts', shiftRoute);

app.get('/',(req,res)=>{
    res.send('Shiftly API Server is working well');
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is working at http://localhost:${PORT}`);
});