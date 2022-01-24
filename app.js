const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

//import routes
const authRoute = require('./routes/auth');
const corralRoute = require('./routes/corrals');
const typeRoute = require('./routes/type');
const restrictionRoute = require('./routes/restriction');
const animalRoute = require('./routes/animal');

dotenv.config();

//connection db
mongoose.connect(process.env.DB_CONNECT,
    () => console.log("connected to db")
);

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Router middleware
app.use('/api/user', authRoute);
app.use('/api/corral', corralRoute);
app.use('/api/type', typeRoute);
app.use('/api/restriction', restrictionRoute);
app.use('/api/animal', animalRoute);

app.listen(process.env.PORT || 3000, () => console.log('Sever started in 5000'));