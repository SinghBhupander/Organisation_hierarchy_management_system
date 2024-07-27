const EmployeeModel = require("../Models/EmployeeModel");

    const createEmployee = async (req, res) => {           // creating a function
        try{
            const body = req.body;
            body.profileImage = req.file ? req.file?.path : null;
            const emp = new EmployeeModel(body);
            await emp.save();
            res.status(201).json({
                message: 'EMployee Created',
                success : true
            });
        }catch(err){
            res.status(500).json({
                message: 'Internal server error',
                success:false,
                error: err
            });
        }
    }

    const updateEmployeeById = async (req, res) => {           // update by id
        try{
            const { id } = req.params;
            const { name, email, phone, department, salary, manager } = req.body;
            

            let updateData = {
                name, email, phone, department, salary, manager, updatedAt: new Date()
            };

            if(req.file) {
                updateData.profileImage = req.file.path;
            }

            const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            if(!updatedEmployee){
                return res.status(404).json({message: 'Employee not Found'});
            }

            res.status(200).json({
                message: 'EMployee updated',
                success : true,
                data: updatedEmployee
            });
        }catch(err){
            res.status(500).json({
                message: 'Internal server error',
                success:false,
                error: err
            });
        }
    }

    const getAllEmployee = async (req, res) => {            // function to retrieve all employees
        try{
            let { page, limit, search } = req.query;   // applying pagination

            page = parseInt(page) || 1;
            limit = parseInt(limit) || 5;

            const skip = (page - 1) * limit;
            // page 3 => (3-1)*5 = 10 skips

            let searchCriteria = {};                     // apply search
            if(search) {
                searchCriteria = {
                    name: {
                        $regex: search,
                        $options: 'i' // case insensitive
                    }
                }
            }

            const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);


            const emp = await EmployeeModel.find(searchCriteria).skip(skip).limit(limit).sort({ updatedAt: -1 });

            const totalPages = Math.ceil(totalEmployees / limit);

            res.status(200).json({
                message: 'All Employees',
                success : true,
                data : {
                    employees: emp,
                    pagination: {
                        totalEmployees,
                        currentpage: page,
                        totalPages,
                        pageSize: limit
                    }
                }
            });
        }catch(err){
            res.status(500).json({
                message: 'Internal server error',
                success:false,
                error: err
            });
        }
    }

    const getEmployeeById = async (req, res) => {            // function to get specific employees
        try{
            const { id } = req.params;
            const emps = await EmployeeModel.findOne({ _id: id});
            res.status(203).json({
                message: 'Get Employee Details by ID',
                success : true,
                data : emps
            });
        }catch(err){
            res.status(500).json({
                message: 'Internal server error',
                success:false,
                error: err
            });
        }
    }

    const deleteEmployeeById = async (req, res) => {            // function to delete  specific  employee
        try{
            const { id } = req.params;
            const emp = await EmployeeModel.findByIdAndDelete({ _id: id});
            res.status(203).json({
                message: 'Deleted Succesfully',
                success : true
            });
        }catch(err){
            res.status(500).json({
                message: 'Internal server error',
                success:false,
                error: err
            });
        }
    };


    

module.exports = {
    createEmployee , getAllEmployee , getEmployeeById, deleteEmployeeById , updateEmployeeById
}; 