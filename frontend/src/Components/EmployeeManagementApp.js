import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import AddEmployee from './AddEmployee';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import { useNavigate } from 'react-router-dom';

function EmployeeManagementApp() {

  const [showModal , setShowModal] = useState(false);                           //state for new entry
  const [updateEmpObj , setUpdateEmpObj] = useState(null);

  const handleAddEmployee = () => {
          setShowModal(true);
  }

  const handleUpdateEmployee = (empObj) => {
      console.log( 'Update object', empObj);
      setUpdateEmpObj(empObj);
      setShowModal(true);
  }

  const handleDeleteEmployee = async (emp) => {
    try{
        const { success, message} = await DeleteEmployeeById(emp._id);
        fetchEmployees();
        if(success){
          notify(message, 'success');

        } else {
          notify(message, 'error');
        }
    }catch(err){
        console.log('error', err);

    }
  }

  const [employeeData , setEmployeeData] = useState({                                                       //state for getting data from json
        "employees": [],
        "pagination": {
             "totalEmployees":0,
             "currentPage":1,
             "totalPages":1,
             "pageSize":5
        }
  });

  const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        try{
          const { data }= await GetAllEmployees(search, page, limit);
          setEmployeeData(data);

        }catch(err){
          console.log('Error', err);
        }
  };


  useEffect(()=>{
      fetchEmployees();
  },[]);

  const handleSearch= (e) =>{                               //to handle search operations
    const term = e.target.value;
    fetchEmployees(term);
  }

  const navigate = useNavigate();

  const handleViewHierarchy = () => {
    navigate('hierarchy');
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
        <h1> Organisational Management System</h1>
        <div className='w-100 d-flex justify-content-center'>

            <div className='w-100 border bg-light p3'>
              <div className='d-flex justify-content-between mb-3'>
               <button className='btn btn-primary'
                      onClick={() => handleAddEmployee()}
               >
                        Add
               </button>

               <input 
               onChange={handleSearch}
                type='text'
                placeholder= 'Search Employees'
                className='form-control w-50'
               />
             </div>
                <EmployeeTable 
                  handleDeleteEmployee={handleDeleteEmployee}
                  handleUpdateEmployee={handleUpdateEmployee}
                  fetchEmployees = {fetchEmployees}
                  employees = {employeeData.employees}
                  pagination = {employeeData.pagination}
                />

                <AddEmployee 
                  updateEmpObj= {updateEmpObj}
                  fetchEmployees = {fetchEmployees}
                  showModal={showModal}
                  setShowModal= {setShowModal}
                />

                <div class="d-grid gap-2 col-6 mx-auto">
                <button type="button" class="btn btn-outline-primary" onClick={handleViewHierarchy}> Hierarchy View</button>
                </div>

            </div>
           
        </div>
        <ToastContainer 
          position='top-right'
          autoClose = {3000}
          hideProgressBar = {false}
        />
     </div>
    
  )
}

export default EmployeeManagementApp