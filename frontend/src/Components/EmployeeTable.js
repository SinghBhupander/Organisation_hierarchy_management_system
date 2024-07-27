import React from 'react'
import { Link } from 'react-router-dom';

function EmployeeTable( {employees , pagination, fetchEmployees, handleUpdateEmployee, handleDeleteEmployee}) {
    const headers = [ 'name', 'email', 'phone', 'department', 'manager', 'actions'];
    const {currentpage, totalPages} = pagination;

    const handleNextPage = () => {                                // for previous and next buttons
      if(currentpage < totalPages){
          handlePagination(currentpage + 1);
      }
    };

    const handlePreviousPage = () => {                                // for previous and next buttons
      if(currentpage > 1){
          handlePagination(currentpage - 1);
      }
    };

    const handlePagination = (currentPage) => {
            fetchEmployees('',currentPage, 5)
    }

    const TableRow = ({employee}) => {
        return <tr>
            <td>
                <Link to= {`/employee/${employee._id}`} className='text-decoration-none'>
                 {employee.name}
                </Link>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>{employee.manager}</td>
            <td>
                <i className='bi bi-pencil-fill text-warning me-4'
                    role='button'
                    data-bs-toggle = 'tooltip'
                    data-bs-placement ='top'
                    onClick={() =>handleUpdateEmployee(employee)}>
                    

                </i>

                <i className='bi bi-trash-fill text-danger md-4'
                    role='button'
                    data-bs-toggle = 'tooltip'
                    data-bs-placement ='top'
                    onClick={() =>handleDeleteEmployee(employee)}>
                    

                </i>
            </td>
        </tr>
    }
    const pageNumbers = Array.from({ length: totalPages},(_, index) => index + 1);

   

  return (
    <>
      <table className='table table-striped'>
        <thead>
              <tr>
                {
                    headers.map((header , i) => (
                        <th key={i}>{header} </th>
                    ))
                }
              </tr>
        </thead>
        <tbody>
                {
                  employees.map((emp)=> (
                    <TableRow employee={emp} key={emp._id} />

                  ))
                }
        
        </tbody>
        

      </table>
      <div className='d-flex justify-content-between align-items-center my-3'>
                <span className='badge bg-primary'> Page {currentpage} of {totalPages}</span>
                <div>
                  <button className='btn btn-outline-primary me-2'
                      onClick={()=> handlePreviousPage()}
                      disabled={currentpage === 1}
                  >    Previous

                  </button>

                  {
                    pageNumbers.map((page) =>(
                      
                      <button 
                      key={page}
                      className={`btn btn-outline-primary me-1 ${currentpage === page ? 'active' :''}`}
                      onClick={() => handlePagination(page)}>
                        {page}
                      </button>
                    ))
                  }



                  <button className='btn btn-outline-primary me-2'
                      onClick={()=>handleNextPage()}
                      disabled={totalPages === currentpage}
                  >    Next

                  </button>
                </div>
        </div>
    </>
  )
}

export default EmployeeTable