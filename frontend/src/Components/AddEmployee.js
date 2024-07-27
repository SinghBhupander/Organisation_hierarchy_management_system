import React, { useEffect, useState } from 'react'
import { CreateEmployee, UpdateEmployeeById } from '../api';
import { notify } from '../utils';

function AddEmployee({showModal , setShowModal , fetchEmployees , updateEmpObj}) {

    const [employee , setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null,
        manager: ''
    })
    
    const [updateMode, setUpdateMode] = useState(false);

   useEffect(() =>{
     if(updateEmpObj){
        setUpdateMode(true);
        setEmployee(updateEmpObj);
     }
   }, [updateEmpObj])

    const resetEmployeeStates = () => {                  // no reoload req setup direct acess
        setEmployee({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null,
        manager: ''

        })
    }

    const handleClose= () =>{
        setShowModal(false);
    }

    const handleChange = (e) => {
            const {name , value} = e.target;
            setEmployee({...employee, [name]: value})
    }

    const handleFileChange = (e) => {
            setEmployee({...employee, profileImage: e.target.files[0]})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(employee);
        try{
            const{success , message} = updateMode? await UpdateEmployeeById(employee, employee._id) : await CreateEmployee(employee);
            console.log(success,message);
            if(success){
                notify(message, 'success');
            }else{
                notify(message, 'error');
            }
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
        }catch(err){
            notify(err, 'error');
        }
    }

  return (
    <div className = {`modal ${showModal ? 'd-block' : ''}`}
    tabIndex={-1}
    style={{
        display : showModal ? 'block' : 'none'
    }}
    >
        <div className='modal-dialog' role='document'>
            <div className='modal-content'>
                <div className='modal-header'>
                        <h5> {updateMode ? 'Update Employee' : 'Add Employee'}</h5>
                        <button type='button' className='btn-close' 
                         onClick={() => handleClose()}
                        >

                        </button>
                </div> 

                <div className='modal-body'>                                             
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='mb-3'>
                            <label className='form-label'> Name </label>
                            <input 
                            type='text'
                            className='form-control'
                            name='name'
                            value ={employee.name}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Email </label>
                            <input 
                            type='email'
                            className='form-control'
                            name='email'
                            value ={employee.email}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Phone </label>
                            <input 
                            type='text'
                            className='form-control'
                            name='phone'
                            value ={employee.phone}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> department </label>
                            <input 
                            type='text'
                            className='form-control'
                            name='department'
                            value ={employee.department}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Salary </label>
                            <input 
                            type='text'
                            className='form-control'
                            name='salary'
                            value ={employee.salary}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Profile Image </label>
                            <input 
                            type='file'
                            className='form-control'
                            name='profileImage'
                            onChange={handleFileChange}
                        
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Manager </label>
                            <input 
                            type='text'
                            className='form-control'
                            name='manager'
                            value ={employee.manager}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        <button className='btn btn-primary' type='submit' > {updateMode ? 'Update' : 'Save'} </button>

                    </form>

                </div>

            </div>

        </div>
    </div>
  )
}

export default AddEmployee