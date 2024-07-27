const { createEmployee, getEmployeeById, deleteEmployeeById, updateEmployeeById,  } = require('../Controllers/EmployeeController');
const { getAllEmployee } = require('../Controllers/EmployeeController');
const { cloudinaryFileUploader } = require('../Middleware/FileUploader');
const EmployeeModel = require("../Models/EmployeeModel");

const routes = require('express').Router();


routes.get('/',getAllEmployee);

routes.post('/',cloudinaryFileUploader.single('profileImage'),createEmployee);

routes.put('/:id',cloudinaryFileUploader.single('profileImage'),updateEmployeeById);   // put method for update

routes.get('/:id', getEmployeeById );

routes.delete('/:id', deleteEmployeeById );




module.exports= routes;