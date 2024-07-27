const express = require('express');
const cors = require('cors');
const app = express();    //initialised express
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./Models/db');
const EmployeeRouter = require('./Routes/EmployeeRoutes');

app.use(cors());               // cross origin resource sharing from other local host will be enabled
app.use(bodyParser.json());    // helps form like assesing to entries from json

app.get('/',(req,res) =>{
    res.send('server is running')

});

app.use('/api/employees', EmployeeRouter);

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
});
