import React , { useEffect, useState}from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import { GetEmployeeDetailsById } from '../api';


function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});

  const fetchEmployeeDetails = async () => {
      try {
          const data = await GetEmployeeDetailsById(id);
          setEmployee(data);
      } catch (err) {
          alert('Error', err);
      }
  }
  useEffect(() => {
      fetchEmployeeDetails();
  }, [id])

  if (!employee) {
      return <div>Employee not found</div>;
  }

  return (
    
       <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <img
                                src={employee.profileImage}
                                alt={employee.name}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-9">
                            <h4>{employee.name}</h4>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Salary:</strong> {employee.salary}</p>
                            <p><strong>Manager:</strong> {employee.manager}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/employee')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
      
      
  );
};

export default EmployeeDetails